<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a aria-label="Предыдущая страница" 
        href="#" 
        class="pagination__link pagination__link--arrow" 
        :class="{'pagination__link--disabled': page <= 1}"
        @click.prevent="prevPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>


    <li class="pagination__item" v-for="(pageNumber, index) in pagesInPagination" :key="index">
      <a class="pagination__link" 
        :class="{'pagination__link--current': pageNumber === page}" 
        :href="pageNumber === page ? false : '#'" 
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>


    <li class="pagination__item">
      <a aria-label="Следующая страница" 
        href="#" 
        class="pagination__link pagination__link--arrow" 
        :class="{'pagination__link--disabled': page >= pagesAll}" 
        @click.prevent="nextPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['page', 'count', 'perPage'],
  computed: {
    pagesAll() {
      return Math.ceil(this.count / this.perPage);
    },
    pagesInPagination() {
      const allPages = Array.from({length: Math.ceil(this.count / this.perPage)}, (v, k) => k + 1);
      let pagesArr = [];

      const addPoint = (first, two, method = 'push') => {
        if (pagesArr.indexOf(first) == -1) {
          if(pagesArr.indexOf(two) == -1) {
            pagesArr[method]('...');
          }
          pagesArr[method](first);
        }
      };

      let currentPageIndex = allPages.indexOf(this.page);
      let j = 1;

      for(let i = this.page < allPages[4] ? 3 : 1; i > 0; i--) {
        if(!allPages[currentPageIndex - i]) {
          j++;
        } else {
          pagesArr.push(allPages[currentPageIndex - i]);
        }
      }

      pagesArr.push(this.page);

      for(let i = 1; i <= j; i++) {
        if(allPages[currentPageIndex + i]) {
          pagesArr.push(allPages[currentPageIndex + i]);
          if(this.page === allPages[allPages.length - 4]){
            pagesArr.push(allPages[currentPageIndex + i + 1]);
          }
        }
      }

      addPoint(allPages[allPages.length - 1], allPages[allPages.length - 2]);

      currentPageIndex = allPages.indexOf(pagesArr[0]);
      const endLenght = pagesArr.length;
      for(let i = 1; i < 6 - endLenght; i++) {
        if(allPages[currentPageIndex - i]) {
          pagesArr.unshift(allPages[currentPageIndex - i]);
        }
      }
      
      addPoint(allPages[0], allPages[1], 'unshift');

      return pagesArr;
    }
  },
  methods: {
    paginate(page) {
      
      this.$emit('update:page', page);
    },
    prevPage() {
      if(this.page > 1) {
        this.$emit('update:page', this.page - 1);
      }
    },
    nextPage() {
      if(this.page < this.pagesAll) {
        this.$emit('update:page', this.page + 1);
      }
    },
  },
}
</script>