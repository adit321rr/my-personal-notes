import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO [Basic] kelola nilai title sebagai controlled input.
      title: '',
      // TODO [Basic] kelola nilai body sebagai controlled textarea.
      body: '',
      error: false,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    // TODO [Basic] update state dengan nilai event.target.value.
    // TODO [Skilled] batasi judul maksimal 50 karakter dan tampilkan peringatan saat sisa karakter < 10.
    console.warn('[TODO] Handle title change', event.target.value);
    const limit = 50;
    // Batasi input maksimal 50 karakter menggunakan state (Skilled Criteria)
    if (event.target.value.length <= limit) {
      this.setState({ title: event.target.value });
    }
  }

  onBodyChangeEventHandler(event) {
    // TODO [Basic] update state body agar textarea menjadi controlled component.
    console.warn('[TODO] Handle body change', event.target.value);
    this.setState({
      body: event.target.value,
      error: event.target.value.length > 0 && event.target.value.length < 10,
    });

  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    // TODO [Basic] panggil props.addNote dengan data title & body dari state, lalu reset form.
    // TODO [Advanced] tolak submit ketika body kurang dari 10 karakter dan tampilkan pesan error.
    console.warn('[TODO] Submit note', this.state);
        event.preventDefault();

    // Advanced Criteria: Tolak submit jika isi < 10 karakter
    if (this.state.body.length < 10) {
      this.setState({ error: true });
      return;
    }

    this.props.addNote({
      title: this.state.title,
      body: this.state.body,
    });

    // Reset form setelah sukses
    this.setState({ title: '', body: '', error: false });
  }

  render() {
    // TODO [Skilled] hitung sisa karakter jika menerapkan limit 50 karakter.
    const remainingChars = 50 - this.state.title.length; // update dengan nilai yang sesuai

        return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {/* Advanced Criteria: Pesan Error Validasi */}
        {this.state.error && (
          <p className="note-input__feedback--error">
            Isi catatan minimal harus 10 karakter
          </p>
        )}

        <form onSubmit={this.onSubmitEventHandler} data-testid="note-input-form">
          {/* Skilled Criteria: Sisa Karakter */}
          <p className="note-input__title__char-limit" data-testid="note-input-title-remaining">
            Sisa karakter: {remainingChars}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;

