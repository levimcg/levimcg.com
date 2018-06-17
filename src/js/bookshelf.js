/**
 * Do some feature testing here to see if we have JS and if
 * the browser supports our code.
 */
if (
  "querySelector" &&
  "addEventListener" &&
  "classList" &&
  Vue.component() in window
) {
  // Select our library container.
  var library = document.querySelector(".library")

  // If our browser is capable, remove our fallback.
  library.classList.remove("no-mustard")

  var vm = new Vue({
    el: "#library-app",

    data: {
      title: "Libary",
      libraryBooks: [],
      filteredBooks: [],
      currentTag: ""
    },

    computed: {
      bookTags: function() {
        var allTags = []

        this.libraryBooks.forEach(function(book) {
          // allTags.push(...book.tags);
          book.tags.forEach(function(tag) {
            allTags.push(tag)
          })
        })

        /**
         * This is a nice trick to return a unique array with all
         * duplicate items removed.
         *
         * http://mikeheavers.com/tutorials/removing_duplicates_in_an_array_using_javascript/
         */
        var uniqueTags = allTags.filter(function(tag, index) {
          return allTags.indexOf(tag) == index
        })

        return uniqueTags
      }
    },

    methods: {
      getLibraryBooks: function() {
        var req = new XMLHttpRequest()
        req.open("GET", "../bookshelf/bookshelf.json")

        req.onload = function() {
          var books = JSON.parse(req.responseText)
          this.libraryBooks = books
          this.filteredBooks = this.libraryBooks
        }.bind(this)
        req.send()
      },

      handleFilter: function(e) {
        var currentFilter = e.target.getAttribute("data-filter")
        this.currentTag = currentFilter

        var filteredBookArr = this.libraryBooks.filter(function(book) {
          return book.tags.indexOf(currentFilter) > -1
        })

        this.filteredBooks = filteredBookArr
      },

      resetFilter: function() {
        this.filteredBooks = this.libraryBooks
        this.currentTag = "all"
      }
    },

    filters: {
      /**
       * Got this one here:
       * https://vuejs.org/v2/guide/filters.html
       */
      capitalize: function(value) {
        if (!value) return ""
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },

    mounted: function() {
      this.getLibraryBooks()
      this.filteredBooks = this.libraryBooks
    }
  })
}
