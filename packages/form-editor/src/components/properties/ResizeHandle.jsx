export function ResizeHandle({ onResizeStart, onResizeKey }) {
  if (!onResizeStart) return null
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Redimensionar painel de propriedades"
      tabIndex={0}
      className="absolute inset-y-0 left-0 hidden w-2 cursor-col-resize rounded-full transition hover:bg-blue-300/70 focus-visible:bg-blue-300/70 focus-visible:outline-none lg:block"
      onPointerDown={onResizeStart}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          onResizeKey(20)
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          onResizeKey(-20)
        }
      }}
    />
  )
}
