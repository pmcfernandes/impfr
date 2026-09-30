# ImPedro.Storage

Disk file storage and upload service. It has no domain dependencies (only BCL + DI/Options). Register it with `AddImPedroStorage()` (`IFileStorage` singleton, `UploadService` scoped).

## `StorageOptions`

`RootPath` (defaults to `uploads/` beside the binaries), `MaxFileBytes` (defaults to 10 MB; `<= 0` is unlimited), and `AllowedExtensions` (defaults to all extensions allowed).

## `IFileStorage` / `LocalFileStorage`

Stores each file as `{guid}{extension}` with a `{guid}{extension}.meta` sidecar (original name, content type, and date). Provides `SaveAsync`, `OpenReadAsync`, `DeleteAsync`, `ExistsAsync`, and `ListAsync` (newest first). Names with separators, `..`, absolute paths, or `.` are rejected (`ArgumentException`); final resolution is validated to remain under the root.

## `UploadService`

`UploadAsync(stream, originalName, contentType)` sanitizes the name (`Path.GetFileName`, default `file`) and validates extension and size (`InvalidOperationException` becomes API 400); also provides `DownloadAsync`, `ExistsAsync`, `DeleteAsync`, and `ListAsync`.

## Endpoint (`UploadsController`, `api/uploads`, authenticated)

`GET /` lists files, `POST /` accepts multipart uploads (one or more, 201 with metadata), `GET /{name}` downloads (404 when missing, extension-based content type), and `DELETE /{name}` returns 404/204. Persist metadata (for example, `Name`/`Filename` in a `WorkflowAttachment`) through `WorkflowService`.
