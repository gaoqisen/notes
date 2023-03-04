export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"home\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"icon\":\"home\",\"title\":\"home\",\"heroImage\":\"/logo.svg\",\"heroText\":\"学习笔记\",\"tagline\":\"整理的一些学习笔记\",\"actions\":[{\"text\":\"算法\",\"link\":\"/algorithm/\"},{\"text\":\"JAVA\",\"link\":\"/java/\"},{\"text\":\"生活\",\"link\":\"/life/\"}]},\"headers\":[],\"readingTime\":{\"minutes\":0.13,\"words\":38},\"filePathRelative\":\"README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
