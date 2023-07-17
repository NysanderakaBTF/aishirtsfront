<template>
    <div
            v-if="isOpen"
            class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto sm:w-full"
            @click="closeModal"
    >
        <div
                class="fixed inset-0 transition-opacity"
                @click="closeModal"
                :class="{ 'bg-gray-700 opacity-75': backdrop }"
        ></div>
        <div
                class="relative bg-white w-full max-w-md mx-auto rounded shadow-lg px-6 py-4"
                :class="{ 'mt-6': header }"
                @click.stop
        >
            <div v-if="header" class="text-lg font-bold pb-4 flex head flex-row space-between w-full">
                <div>{{ header }}</div>
                <div><slot name="head_control"></slot></div>
            </div>
            <div class="py-4">
                <slot></slot>
            </div>
            <div v-if="buttons" class="flex justify-end space-between pt-4">
                <button
                        v-for="(button, index) in buttons"
                        :key="index"
                        class="px-4 py-2 text-white font-semibold rounded-lg shadow-md cursor-pointer ml-2"
                        :class="button.class"
                        @click="button.action"
                >
                    {{ button.text }}
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        header: {
            type: String,
            required: false,
        },
        buttons: {
            type: Array,
            required: false,
            default: () => [],
        },
        backdrop: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    methods: {
        closeModal() {
            this.$emit("close-modal");
        },
    },
};
</script>
<style>
.head{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>