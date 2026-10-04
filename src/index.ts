import { registerRoot } from 'remotion';
import { Root } from './Root';
import { loadYekanBakhFonts } from './fonts/yekanBakh';

loadYekanBakhFonts();

registerRoot(Root);

