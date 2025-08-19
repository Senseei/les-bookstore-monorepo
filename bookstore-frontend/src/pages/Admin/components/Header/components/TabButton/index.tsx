interface TabButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export const TabButton = ({ label, isActive, onClick }: TabButtonProps) => {
  return <button onClick={onClick}>{isActive ? `[${label}]` : label}</button>
}
