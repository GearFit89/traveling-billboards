export default function Spinner() {
  // We use a plain object for styles to keep it as a Server Component
  // For the animation, we can use a small global CSS class or inline SVG
  return (
    <div
      style={{
        display: "flex", // Flexbox layout
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1, // Fill available space
        height: "100dvh", // Take whole screen
      }}
    >
      <div
        className="spinner"
        style={{
          border: "0.25rem solid rgba(0, 0, 0, 0.1)",
          borderTop: "0.25rem solid #000",
          borderRadius: "50%",
          width: "2.5rem",
          height: "2.5rem",
          minWidth: "40px", // px allowed for min-width
          minHeight: "40px", // px allowed for min-height
        }}
      />
      {/* Note: To animate this without "use client",
        the 'spin' keyframes must be in your global.css
      */}
    </div>
  );
}
