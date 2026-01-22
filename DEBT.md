# Technical Debt & Upstream Customizations

This file tracks local customizations (Shadowing) that duplicate or modify core Volto/Plone functionalities and are waiting for resolution in the community (Upstream).

**Goal:** Remove as many lines from this table as possible with every Volto version upgrade.

## 📋 Tracking Table

| ID | Date | Local File (Shadowed) | Original PR/Issue (Upstream) | Reason for Customization | Exit Condition (When to delete?) | Status |

| DEBT001 | `src/theme/extras/_toolbar.scss` | [plone/volto#](https://github.com/plone/volto/pull/) | A11Y - Lack of contrast - Toolbar icons | When the issue [volto/issues/7765](https://github.com/plone/volto/issues/7765) is resolved and released. | 🚧 In Progress |

## 📝 Update Notes

- **2026-01-08** added `DEBT001` waiting for community review.
- **2026-01-08:** File creation. Actual Volto version io Comune 17.22.3

## 🏷️ Status Legend

- ✅ **Merged:**
- ⏳ **Pending:**
- 🚧 **In Progress:**
- ❌ **Closed/Rejected:**
