# Staging Import Mapping

## research_reports
| Manifest Column | Staging Column | Notes |
| :--- | :--- | :--- |
| `title` | `display_title` | Direct map |
| `draft_summary` | `short_summary` | Direct map |
| `draft_excerpt` | `research_synopsis` | Direct map |
| `date` | `published_at` | Converted to timestamptz |
| `category` | `category_id` | Lookup via `research_categories` table |
| `publish_status_recommendation` | `publish_status` | Mapped to `draft`, `review`, or `published` |
| `legacy_id` | N/A | ignored_for_now |
| `source_system` | N/A | ignored_for_now |
| `legacy_url` | N/A | ignored_for_now |
| `duplicate_group` | N/A | Used for script filtering, not stored |
| (Storage Path) | N/A | handled_by_storage_later |

## analysts
| Manifest Column | Staging Column | Notes |
| :--- | :--- | :--- |
| `name` | `full_name` | Direct map |
| slugify(`name`) | `slug` | Generated |
| `title` | `title` | Direct map |
| `bio` | `bio` | Direct map |
| `email` | `email` | Direct map |
| `avatar_url` | `avatar_url` | Direct map |
| `legacy_id` | N/A | ignored_for_now |
| `source_system` | N/A | ignored_for_now |

## research_categories
| Manifest Column | Staging Column | Notes |
| :--- | :--- | :--- |
| `category` | `name` | Direct map |
| slugify(`category`) | `slug` | Generated |

## research_report_analysts
| Manifest Column | Staging Column | Notes |
| :--- | :--- | :--- |
| `author_1`, `author_2` | `analyst_id` | Lookup via `analysts` table |
| (Report ID) | `report_id` | Generated on report insert |
