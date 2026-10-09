# Ticket 33: Camera Frustum & Smooth Exit Opacity (Fix Sec 12 & 26 Pop-Out)

## Problem
In seconds 12 and 26, when the camera transitions to the next act, the previous act remains partially visible on the left border, and then abruptly pops out of existence due to boolean unmounting (`act1Visible = camX < 800`).

## Solution
1. Increase spatial spacing or adjust camera lead room so cards naturally glide completely beyond the screen border before settling on the next scene.
2. Replace hard unmounting with distance-based smooth continuous opacity falloff:
   `cardOpacity = interpolate(Math.abs(camX - cardX), [900, 1400], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })`
3. Maintain co-presence during the pan, but ensure zero visual pop or abrupt disappearing.
