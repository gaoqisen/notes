export const data = JSON.parse("{\"key\":\"v-201217b5\",\"path\":\"/guide/foo/gaoqisen.html\",\"title\":\"gaoqisen\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"gaoqisen\",\"icon\":\"config\"},\"headers\":[],\"readingTime\":{\"minutes\":0.02,\"words\":7},\"filePathRelative\":\"guide/foo/gaoqisen.md\"}")

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
