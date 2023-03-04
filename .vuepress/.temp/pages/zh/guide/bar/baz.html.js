export const data = JSON.parse("{\"key\":\"v-1e317375\",\"path\":\"/zh/guide/bar/baz.html\",\"title\":\"Baz\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Baz\",\"icon\":\"info\"},\"headers\":[],\"readingTime\":{\"minutes\":0.03,\"words\":9},\"filePathRelative\":\"zh/guide/bar/baz.md\"}")

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
