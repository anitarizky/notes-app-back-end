/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
/* eslint "require-jsdoc": ["error", {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true
    }
}]*/

/**
 * A class that can return
 */
class NoteHandler {
  constructor(service) {
    this._service = service;
  }
  postNoteHandler(request, h) {
    try {
      const { title = `untitled`, body, tags } = request.payload;
      const noteId = this._service.addNote({ title, body, tags });

      const response = h.response({
        status: `success`,
        message: `Catatan berhasil ditambahkan`,
        data: {
          noteId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: `fail`,
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }
  getNotesHandler() {
    const notes = this._service.getNotes();
    return {
      status: `success`,
      data: {
        notes,
      },
    };
  }
  getNoteByIdHandler(request) {
    try {
      const { id } = request.params;
      const note = this._service.getNoteById(id);
      return {
        status: `success`,
        data: {
          note,
        },
      };
    } catch (error) {
      const response = h.response({
        status: `fail`,
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
  putNoteByIdHandler() {
    try {
      const { id } = request.params;
      this._service.editNoteById(id, request.payload);
      return {
        status: `success`,
        message: `Catatan berhasil diperbarui`,
      };
    } catch (error) {
      const response = h.response({
        status: `fail`,
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
  deleteNoteByIdHandler() {
    try {
      const { id } = request.params;
      this._service.deleteNoteById(id);
      return {
        status: `success`,
        message: `Catatan berhasil dihapus`,
      };
    } catch (error) {
      const response = h.response({
        status: `fail`,
        message: `Catatan gagal dihapus. Id tidak ditemukan`,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = NoteHandler;
