# Error Codes

Standardized error codes for the Mackkas API.

| HTTP Status | Message | Description |
|---|---|---|
| `400` | `Bad Request` | The request was malformed or missing required parameters. |
| `401` | `Unauthorized` | Authentication is required or credentials were invalid. |
| `403` | `Forbidden` | The user does not have permission to perform this action. |
| `404` | `Not Found` | The requested resource does not exist. |
| `500` | `Internal Server Error` | An unexpected error occurred on the server. |

## JSON Error Format
```json
{
  "message": "Error description here",
  "status": 401
}
```
