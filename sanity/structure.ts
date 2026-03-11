import type { StructureResolver } from "sanity/structure";
import { singletonDocuments } from "@/sanity/singletons";

export const structure: StructureResolver = (S) => {
  const projectMenuItems = S.documentTypeList("project").getMenuItems();

  return S.list()
    .title("Jennifer Atelier CMS")
    .items([
      ...singletonDocuments.map((document) =>
        S.listItem()
          .id(document.documentId)
          .title(document.title)
          .child(
            S.document()
              .schemaType(document.schemaType)
              .documentId(document.documentId)
              .title(document.title),
          ),
      ),
      S.divider(),
      S.listItem()
        .id("portfolio-projects")
        .title("Portfolio Projects")
        .child(
          S.list()
            .title("Portfolio Projects")
            .items([
              S.documentTypeListItem("project").title("All Projects"),
              S.listItem()
                .id("featured-projects")
                .title("Featured on Home")
                .child(
                  S.documentList()
                    .title("Featured on Home")
                    .schemaType("project")
                    .filter('_type == "project" && featured == true')
                    .defaultOrdering([
                      { field: "year", direction: "desc" },
                      { field: "_updatedAt", direction: "desc" },
                    ])
                    .menuItems(projectMenuItems),
                ),
              S.listItem()
                .id("completed-projects")
                .title("Completed Projects")
                .child(
                  S.documentList()
                    .title("Completed Projects")
                    .schemaType("project")
                    .filter('_type == "project" && status == $status')
                    .params({ status: "Completed" })
                    .defaultOrdering([
                      { field: "year", direction: "desc" },
                      { field: "_updatedAt", direction: "desc" },
                    ])
                    .menuItems(projectMenuItems),
                ),
              S.listItem()
                .id("active-projects")
                .title("Active Pipeline")
                .child(
                  S.documentList()
                    .title("Active Pipeline")
                    .schemaType("project")
                    .filter(
                      '_type == "project" && status in ["In Progress", "Concept"]',
                    )
                    .defaultOrdering([
                      { field: "_updatedAt", direction: "desc" },
                      { field: "year", direction: "desc" },
                    ])
                    .menuItems(projectMenuItems),
                ),
            ]),
        ),
    ]);
};
