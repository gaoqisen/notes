import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/shared.js";
import { h } from "vue";

import FontIcon from "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import AudioPlayer from "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/components/AudioPlayer.js";
import Badge from "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import BiliBili from "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/components/BiliBili.js";
import CodePen from "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/components/CodePen.js";
import PDF from "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/components/PDF.js";
import Replit from "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/components/Replit.js";
import StackBlitz from "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/components/StackBlitz.js";
import VideoPlayer from "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/components/VideoPlayer.js";
import YouTube from "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/components/YouTube.js";
import BackToTop from "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";

import "/Users/gaoqisen/Documents/hope/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    if(!hasGlobalComponent("AudioPlayer")) app.component("AudioPlayer", AudioPlayer);
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("BiliBili")) app.component("BiliBili", BiliBili);
    if(!hasGlobalComponent("CodePen")) app.component("CodePen", CodePen);
    if(!hasGlobalComponent("PDF")) app.component("PDF", PDF);
    if(!hasGlobalComponent("Replit")) app.component("Replit", Replit);
    if(!hasGlobalComponent("StackBlitz")) app.component("StackBlitz", StackBlitz);
    if(!hasGlobalComponent("VideoPlayer")) app.component("VideoPlayer", VideoPlayer);
    if(!hasGlobalComponent("YouTube")) app.component("YouTube", YouTube);
    
  },
  setup: () => {

  },
  rootComponents: [
    () => h(BackToTop, { threshold: 300 }),
  ],
});
