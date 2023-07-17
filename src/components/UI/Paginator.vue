
<template>
    <nav class="pagination" v-if="totalPages>1">
        <div class="flex pl-0 rounded flex-row items-center">
            <button
                    :disabled="currentPage <= 1"
                    @click="previousPage"
                    :class="[
                          'hover:text-white',
                          'text-slate-900',
                          'border',
                          'border-gray-300',
                          'hover:bg-slate-300',
                          'rounded-l-md',
                          'px-3',
                          'py-2',
                          'text-sm',
                          'font-medium',
                          { 'disabled': currentPage <= 1 },
                          { 'bg-slate-200': currentPage === 1 },
                        ]"
            >
                Previous
            </button>
            <div v-if="this.currentPage-2 > 1"
                 :class="[
                        'max-w-xs',
                        'inline',
                        'pageB',
                            'hover:text-white',
                            'text-slate-900',
                            'border',
                            'border-gray-300',
                            'px-3',
                            'py-2',
                            'text-sm',
                            'font-medium',
                            'min-h-full',
                             'disabled'

                          ]">
                ...
            </div>
            <div
                    v-for="pageNumber in pages"
                    :key="pageNumber"
                    @click="changePage(pageNumber)"
                    :class="[
                        'max-w-xs',
                        'inline',
                        'pageB',
                            'hover:text-white',
                            'text-slate-900',
                            'border',
                            'border-gray-300',
                            'hover:bg-slate-500',
                            'px-3',
                            'py-2',
                            'text-sm',
                            'font-medium',
                            'min-h-full',
                            { 'disabled': totalPages === 0 },
                            { 'bg-slate-300': pageNumber === currentPage },
                          ]"
                    :disabled="totalPages === 0 || currentPage === pageNumber"
            >
                {{ pageNumber }}
            </div>
            <div v-if="this.currentPage+2 < totalPages"
                 :class="[
                        'max-w-xs',
                        'inline',
                        'pageB',
                            'hover:text-white',
                            'text-slate-900',
                            'border',
                            'border-gray-300',
                            'px-3',
                            'py-2',
                            'text-sm',
                            'font-medium',
                            'min-h-full',
                             'disabled'

                          ]">
                ...
            </div>
            <button
                    :disabled="currentPage === totalPages || totalPages === 0"
                    @click="nextPage"
                    :class="[
                              'hover:text-white',
                              'text-slate-900',
                              'border',
                              'border-gray-300',
                              'hover:bg-slate-300',
                              'rounded-r-md',
                              'px-3',
                              'py-2',
                              'text-sm',
                              'font-medium',
                              { 'disabled': currentPage === totalPages || totalPages === 0 },
                              { 'bg-slate-200': currentPage === totalPages },
                            ]"
            >
                Next
            </button>
        </div>
    </nav>
</template>
<style>
.pageB{

}
.pagination {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    max-width: fit-content;
}

.pagination li {
    cursor: pointer;
}

.pagination button.disabled {
    pointer-events: none;
    opacity: 0.5;
}

.pagination button.active {
    color: white;
    pointer-events: none;
}
</style>
<script>
import {executeTransition} from "@vueuse/core";

export default {
    name: 'Pagination',
    props: {
        totalItems: {
            type: Number,
            required: true
        },
        itemsPerPage: {
            type: Number,
            default: 10
        },
        currentPage: {
            type: Number,
            default: 1
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        pages() {
            const startPage = Math.max(1, this.currentPage - 2);
            const endPage = Math.min(this.totalPages, this.currentPage + 2);
            return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
        }
    },
    methods: {
        executeTransition,
        changePage(pageNumber) {
            if (pageNumber < 1 || pageNumber > this.totalPages) {
                return;
            }
            this.$emit('pageChanged', pageNumber);
        },
        previousPage() {
            this.changePage(this.currentPage - 1);
        },
        nextPage() {
            this.changePage(this.currentPage + 1);
        }
    }
}
</script>
