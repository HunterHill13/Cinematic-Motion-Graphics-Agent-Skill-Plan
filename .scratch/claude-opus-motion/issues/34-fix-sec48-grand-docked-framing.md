# Ticket 34: Fix Second 48 Grand Docked Framing (Tight Gap & Centered Layout)

## Problem
In second 48 (Act 4 Grand Docked Pavilion), the camera zooms out to show both the Act 3 Blueprint Console and the Act 4 Brutalist Poster. However:
1. The gap between them is excessively wide, leaving a giant empty hole in the focal center of the canvas.
2. The left edge of the Blueprint Console is cut off / halfway off-screen.

## Solution
1. In Act 4 docked mode, smoothly animate Act 3 center position closer to the center ($X = 3280$) and scale to $0.75$, with Act 4 poster positioned at $X = 3980$.
2. Center camera precisely at the visual centroid ($X = 3560$, $camZ = -140$) so:
   - Act 3 left edge is comfortably inside the screen with 60px safe margin.
   - Act 4 right edge is comfortably inside the screen with 60px safe margin.
   - The middle gap between the two cards is a tight, elegant 70px (no empty dead space).
