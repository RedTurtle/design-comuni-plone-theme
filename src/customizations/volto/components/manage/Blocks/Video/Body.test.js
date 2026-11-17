/*
 * Unit tests for getVideoIDAndPlaceholder (customized Video block Body).
 *
 * Why: the Volto 19 re-diff dropped videoUrlHelper, so YouTube /embed/ links
 * (what the YouTube "Share > Embed" dialog gives) got a null video ID and the
 * player rendered as an empty box.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-11-16
 */

import { getVideoIDAndPlaceholder } from './Body';

const YT_TEST_ID = 'Lsc-DRpEauY';
const YT_THUMBNAIL = `https://img.youtube.com/vi/${YT_TEST_ID}/sddefault.jpg`;

describe('getVideoIDAndPlaceholder', () => {
  it.each([
    [`https://www.youtube.com/embed/${YT_TEST_ID}`],
    [`https://www.youtube.com/embed/${YT_TEST_ID}?si=bPdjCj5xtPEMQfLo`],
    [`https://www.youtube.com/v/${YT_TEST_ID}?fs=1`],
    [`https://www.youtube.com/watch?v=${YT_TEST_ID}`],
  ])('resolves the youtube video ID from %s', (url) => {
    const { videoID, thumbnailURL, videoSource, hasMatch } =
      getVideoIDAndPlaceholder(url, []);
    expect(hasMatch).toBe(true);
    expect(videoSource).toBe('youtube');
    expect(videoID).toBe(YT_TEST_ID);
    expect(thumbnailURL).toBe(YT_THUMBNAIL);
  });

  it('keeps using the playlist embed for list links', () => {
    const { videoID, videoUrl } = getVideoIDAndPlaceholder(
      `https://www.youtube.com/watch?v=${YT_TEST_ID}&list=PL123`,
      [],
    );
    expect(videoID).toBeNull();
    expect(videoUrl).toBe(
      'https://www.youtube.com/embed/videoseries?list=PL123',
    );
  });
});
