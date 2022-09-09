import idWidget from 'netlify-cms-widget-simple-uuid';

if (typeof window !== 'undefined') {
  window.NetlifyCmsApp.registerWidget('id', idWidget.IdControl, idWidget.IdPreview);
}