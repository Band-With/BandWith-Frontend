<template>
  <div id="search-reocrd-row3" class="d-flex justify-content-center pt-3 pb-5">
    <nav>
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          v-for="i in pages"
          :key="i"
          :class="{ 'page-item': true, active: i == page }"
        >
          <a class="page-link" @click="movePage(i)">{{ i }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      visible_block: 5,
    };
  },

  computed: {
    start_page() {
      return parseInt((this.page - 1) / this.visible_block) * this.visible_block + 1;
    },
    end_page() {
      return this.start_page + this.visible_block - 1;
    },
    pages() {
      return this.range(this.start_page, this.end_page);
    }
  },

  created() {
  },

  methods: {
    range(start, end) {
      var list = [];
      for (var i = start; i <= end; i++) list.push(i);
      return list;
    },

    movePage(page) {
      const URLSearch = new URLSearchParams(location.search);
      URLSearch.set("p", String(page));
      const newParam = URLSearch.toString();
      window.open(location.pathname + "?" + newParam, "_self");
    },
  },
};
</script>
