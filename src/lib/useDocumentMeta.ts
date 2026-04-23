import { useEffect } from "react";

export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = title.includes("WPL") ? title : `${title} · WPL`;
    document.title = fullTitle;
    if (description) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = "description";
        document.head.appendChild(tag);
      }
      tag.content = description;
    }
  }, [title, description]);
}
