export const data = JSON.parse("{\"key\":\"v-58382636\",\"path\":\"/guide/foo/ray%20copy.html\",\"title\":\"Ray\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Ray\",\"icon\":\"config\"},\"headers\":[],\"readingTime\":{\"minutes\":0.02,\"words\":7},\"filePathRelative\":\"guide/foo/ray copy.md\"}")

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
