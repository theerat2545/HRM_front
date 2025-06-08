<template>
  <div
    v-if="modelValue"
    class="modal-overlay"
    @click.self="close"
  >
    <div class="modal-content">
      <header class="modal-header bg-navy text-white sticky-top bg-white z-10 py-3 px-4 border-bottom">
        <h3 class="modal-title">
          {{ title }}
        </h3>
        <button
          class="modal-close"
          @click="close"
        >
          ×
        </button>
      </header>

      <section class="modal-body">
        <slot />
      </section>

      <footer class="modal-footer">
        <slot name="footer">
          <button
            class="btn btn-secondary"
            @click="close"
          >
            Close
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Modal Title'
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

function close() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto; /* ✅ เพิ่มเพื่อเลื่อน modal ได้ */
  padding: 1rem;     /* ✅ เผื่อระยะด้านบนล่าง */
  z-index: 9999;
}

.modal-content {
  background: #fff;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  animation: fadeIn 0.3s ease;
  position: relative;
  max-height: 90vh;          /* ✅ จำกัดความสูงไม่ให้เกินหน้าจอ */
  overflow-y: auto;          /* ✅ เปิดเลื่อนภายในกล่อง modal */
  box-sizing: border-box;
}


.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  margin: 1rem 0;
}

.modal-footer {
  text-align: right;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.bg-navy {
  background-color: #001f3f!important;
}

.text-white {
  color: #fff!important;
}
</style>
