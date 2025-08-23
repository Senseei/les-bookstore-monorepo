# NavigationButton Usage Examples

## Global Import (NEW!)

```tsx
import { NavigationButton } from "@/components";
import { AddButton } from "./components"; // Local specific component
```

## Basic Usage

```tsx
// Generic navigation button (now global!)
<NavigationButton to="/admin/books">View Books</NavigationButton>

// Primary variant (default)
<NavigationButton to="/admin/customers/new" variant="primary">
  Add Customer
</NavigationButton>

// Secondary variant
<NavigationButton to="/admin/export" variant="secondary">
  Export Data
</NavigationButton>

// Domain-specific convenience component (local)
<AddButton to="/admin/customers/new" />
```

## Real-World Examples

```tsx
// In any admin page - using global NavigationButton
<PageHeader
  title="Books"
  subtitle="Manage your book inventory"
  actionButton={
    <NavigationButton to="/admin/books/new" variant="primary">
      + Add Book
    </NavigationButton>
  }
/>

// Using local AddButton for customer-specific context
<PageHeader
  title="Customers"
  subtitle="Manage your customers"
  actionButton={<AddButton to="/admin/customers/new" />}
/>

// In toolbars - mixing global and local components
<div>
  <NavigationButton to="/admin/reports/export" variant="secondary">
    Export
  </NavigationButton>
  <AddButton to="/admin/customers/new" />
</div>
```

## Component Architecture ✅

### Global Components (`/src/components/`)

- **`NavigationButton`** - Generic, reusable across entire app
- Can be used in any page, any context
- Supports variants and custom content

### Local Components (`/src/pages/Admin/CustomerManagement/components/`)

- **`AddButton`** - Domain-specific, customer context
- Uses global `NavigationButton` internally
- Provides semantic meaning and context

### Benefits:

✅ **Reusability**: NavigationButton available app-wide  
✅ **Consistency**: Same styling and behavior everywhere  
✅ **Maintainability**: Single source of truth for navigation buttons  
✅ **Semantic Clarity**: Local components provide domain context  
✅ **Single Responsibility**: Each component has clear purpose
