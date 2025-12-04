import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportElementToPdf(element, filename) {
  if (!element) return;

  // Forzar fondo claro para evitar recortes de texto por contraste
  const prevBg = element.style.background;
  const prevColor = element.style.color;
  element.style.background = '#fff';
  element.style.color = '#222';

  // Capturar todo el alto del contenido, no solo el viewport
  const targetWidth = Math.max(element.scrollWidth, element.clientWidth);
  const targetHeight = Math.max(element.scrollHeight, element.clientHeight);

  const canvas = await html2canvas(element, {
    scale: 3, // Aumentar escala para mejor nitidez y evitar cortes
    backgroundColor: '#fff',
    useCORS: true,
    scrollY: -window.scrollY,
    windowWidth: targetWidth,
    windowHeight: targetHeight,
    logging: false,
    onclone: (doc) => {
      const root = doc.body;
      
      // Reemplazar todos los inputs y textareas con spans que contengan el texto visible
      root.querySelectorAll('input:not([type="checkbox"]), textarea').forEach((el) => {
        const span = doc.createElement('span');
        const value = el.value || el.getAttribute('value') || '';
        
        // Copiar estilos computados al span
        const computedStyle = window.getComputedStyle(el);
        span.style.cssText = `
          display: inline-block;
          width: ${el.offsetWidth}px;
          min-height: ${el.offsetHeight}px;
          padding: ${computedStyle.padding};
          border: ${computedStyle.border};
          border-radius: ${computedStyle.borderRadius};
          font-size: ${computedStyle.fontSize};
          font-family: ${computedStyle.fontFamily};
          font-weight: ${computedStyle.fontWeight};
          color: ${computedStyle.color};
          background: ${computedStyle.background};
          box-sizing: border-box;
          line-height: ${computedStyle.lineHeight};
          vertical-align: ${computedStyle.verticalAlign};
          overflow: visible;
          white-space: pre-wrap;
          word-wrap: break-word;
        `;
        
        span.textContent = value;
        el.parentNode.replaceChild(span, el);
      });

      // Asegurar que los checkboxes se vean correctamente
      root.querySelectorAll('input[type="checkbox"]').forEach((el) => {
        if (el.checked) {
          el.setAttribute('checked', 'checked');
          // Forzar apariencia visual del checkbox marcado
          el.style.accentColor = '#667eea';
          el.style.width = '16px';
          el.style.height = '16px';
        }
      });

      // Eliminar overflow hidden de todos los contenedores
      root.querySelectorAll('*').forEach((el) => {
        const style = doc.defaultView.getComputedStyle(el);
        if (style && (style.overflow === 'hidden' || style.overflow === 'auto' || style.overflow === 'scroll')) {
          el.style.overflow = 'visible';
        }
      });
    },
  });

  // Restaurar estilos originales
  element.style.background = prevBg;
  element.style.color = prevColor;

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pageWidth; // ajustar imagen al ancho de la página
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width; // altura resultante en mm

  // Añadir primera página
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

  // Si el contenido excede una página, paginar
  let heightLeft = pdfHeight - pageHeight;
  let position = 0;
  while (heightLeft > 0) {
    pdf.addPage();
    position = heightLeft - pdfHeight; // desplazar la imagen hacia arriba para mostrar la siguiente sección
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}
