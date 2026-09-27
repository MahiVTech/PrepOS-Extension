import test from 'node:test';
import assert from 'node:assert/strict';
import chat from '../api/chat.js';
import youtube from '../api/youtube.js';
import status from '../api/status.js';

function mockResponse() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; }
  };
}

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.GEMINI_API_KEY;
  delete process.env.YOUTUBE_API_KEY;
});

 test('chat rejects non-POST requests', async () => {
  const res = mockResponse();
  await chat({ method: 'GET' }, res);
  assert.equal(res.statusCode, 405);
});

test('chat reports missing Gemini key', async () => {
  const res = mockResponse();
  await chat({ method: 'POST', body: { message: 'hello' } }, res);
  assert.equal(res.statusCode, 503);
});

test('chat validates empty message', async () => {
  process.env.GEMINI_API_KEY = 'test-key';
  const res = mockResponse();
  await chat({ method: 'POST', body: { message: '  ' } }, res);
  assert.equal(res.statusCode, 400);
});

test('chat returns model reply from upstream', async () => {
  process.env.GEMINI_API_KEY = 'test-key';
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://generativelanguage.googleapis.com/v1beta/interactions');
    assert.equal(options.headers['x-goog-api-key'], 'test-key');
    const payload = JSON.parse(options.body);
    assert.equal(payload.model, 'gemini-3.8-flash');
    assert.equal(payload.store, false);
    assert.match(payload.input, /User: hello/);
    return {
      ok: true,
      status: 200,
      json: async () => ({ output_text: 'Mocked answer' })
    };
  };
  const res = mockResponse();
  await chat({ method: 'POST', body: { message: 'hello' } }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.reply, 'Mocked answer');
});

test('YouTube rejects non-GET requests', async () => {
  const res = mockResponse();
  await youtube({ method: 'POST' }, res);
  assert.equal(res.statusCode, 405);
});

test('YouTube reports missing API key', async () => {
  const res = mockResponse();
  await youtube({ method: 'GET', query: { playlistId: 'PL123' } }, res);
  assert.equal(res.statusCode, 503);
});

test('YouTube validates missing playlist ID', async () => {
  process.env.YOUTUBE_API_KEY = 'test-key';
  const res = mockResponse();
  await youtube({ method: 'GET', query: {} }, res);
  assert.equal(res.statusCode, 400);
});

test('YouTube maps upstream playlist videos', async () => {
  process.env.YOUTUBE_API_KEY = 'test-key';
  globalThis.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({ items: [{
      contentDetails: { videoId: 'abc' },
      snippet: { title: 'Lesson', channelTitle: 'Demo', thumbnails: { medium: { url: 'https://example.com/thumb.jpg' } } }
    }] })
  });
  const res = mockResponse();
  await youtube({ method: 'GET', query: { playlistId: 'PL123' } }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.items.length, 1);
  assert.equal(res.body.items[0].id, 'abc');
  assert.equal(res.body.items[0].title, 'Lesson');
});


test('status endpoint reports configured flags without exposing keys', async () => {
  process.env.GEMINI_API_KEY = 'secret-test';
  process.env.YOUTUBE_API_KEY = 'youtube-test';
  const res = mockResponse();
  await status({ method: 'GET' }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.geminiConfigured, true);
  assert.equal(res.body.youtubeConfigured, true);
  assert.equal(JSON.stringify(res.body).includes('secret-test'), false);
});
