import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

export function createDropdownMenuCheckboxItem(
  label: string,
  selectedTags: string[],
  handleTagChange: (tag: string, checked: boolean) => void
) {
  return (
    <DropdownMenuCheckboxItem
      checked={selectedTags.includes(label)}
      key={label}
      onCheckedChange={(checked) => handleTagChange(label, checked)}
      onSelect={(e) => e.preventDefault()}
    >
      {label}
    </DropdownMenuCheckboxItem>
  );
}

export function handleTagChange(
  tag: string,
  checked: boolean,
  selectedTags: string[],
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
) {
  if (checked) {
    setSelectedTags([...selectedTags, tag]);
  } else {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  }
}