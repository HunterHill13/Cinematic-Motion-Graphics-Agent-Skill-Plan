import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(90);
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
Config.setCrf(16);
Config.setPixelFormat('yuv420p');
Config.setCodec('h264');
