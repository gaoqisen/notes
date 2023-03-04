export const data = JSON.parse("{\"key\":\"v-40fe7232\",\"path\":\"/zh/guide/foo/ray%20copy.html\",\"title\":\"Ray\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Ray\",\"icon\":\"config\"},\"headers\":[],\"readingTime\":{\"minutes\":0.03,\"words\":9},\"filePathRelative\":\"zh/guide/foo/ray copy.md\"}")

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
