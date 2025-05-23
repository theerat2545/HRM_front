<template>
  <button
    :class="buttonClass"
    :type="type"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClass = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  { 'base-button--disabled': props.disabled }
])

function onClick(event) {
  emit('click', event)
}
</script>

<style scoped>
.base-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: white;
}

.base-button--primary {
  background-color: #007bff;
}
.base-button--navy {
  background-color: #001f3f
}

.base-button--secondary {
  background-color: #6c757d;
}

.base-button--danger {
  background-color: #dc3545;
}

.base-button--disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
