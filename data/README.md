# Data

Each file in this directory represents a namespace of error codes.
The filename should match the `namespace` field and use only lowercase letters, digits, and hyphens.

## Schema

```jsonc
{
  // Unique identifier for this namespace. Must match the filename (without .json).
  "namespace": "http",

  // Human-readable name shown in the UI.
  "title": "HTTP Status Codes",

  // One or two sentences describing the namespace.
  "description": "Status codes returned by HTTP servers.",

  // Optional. Canonical specifications or index pages for this namespace.
  "references": [
    "https://www.rfc-editor.org/rfc/rfc9110"
  ],

  "codes": [
    {
      // The error code as a string. Numeric or symbolic (e.g. "404", "ENOENT").
      "code": "404",

      // Short canonical name.
      "name": "Not Found",

      // One to three sentences. Plain prose; no markdown.
      "description": "The server cannot find the requested resource.",

      // Optional. Direct links to the specification section for this code.
      "references": [
        "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.5"
      ]
    }
  ]
}
```

## Contributing

1. Fork the repository.
2. Add or edit a JSON file in this directory.
3. Validate your JSON is well-formed before opening a pull request.
4. Open a pull request against `main`; CI will build and deploy on merge.
