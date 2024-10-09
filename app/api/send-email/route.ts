import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateCouponCode() {
  return 'T3D' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(solicitud: Request) {
  try {
    const { email } = await solicitud.json();
    const codigoCupon = generateCouponCode();

    const { data, error } = await resend.emails.send({
      from: 'Translate3D <noreply@translate3d.tech>',
      to: [email],
      subject: '¡Bienvenido a Translate3D! Tu aventura 3D comienza aquí',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a Translate3D</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 40px 20px; text-align: center; background-color: #000000;">
                <img src="https://scontent.fbjx1-3.fna.fbcdn.net/v/t39.30808-6/462553253_122095303724571263_199796978902994249_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=AQmpDcMSANAQ7kNvgHCMQi_&_nc_ht=scontent.fbjx1-3.fna&_nc_gid=Aqij9-A-u889teXP6k7AChB&oh=00_AYD2CZ5KNfoH7lbSZQeWku2aznqwfLBemRPb0rHpbQ0xdQ&oe=670C85C6" alt="Translate3D Logo" style="max-width: 200px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 20px;">
                <h1 style="color: #000000; font-size: 28px; margin-bottom: 20px; text-align: center;">¡Bienvenido a Translate3D!</h1>
                <p style="font-size: 16px; line-height: 1.6; color: #333333; margin-bottom: 20px;">
                  Estimado entusiasta de la impresión 3D,
                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #333333; margin-bottom: 20px;">
                  Gracias por unirte a la comunidad de Translate3D. Estamos emocionados de tenerte con nosotros en este viaje de innovación y creatividad. Prepárate para explorar el fascinante mundo de la impresión 3D con nosotros.
                </p>
                <div style="background-color: #f0f0f0; border-left: 4px solid #000000; padding: 20px; margin-bottom: 20px;">
                  <h2 style="color: #000000; font-size: 20px; margin-top: 0;">Tu Regalo de Bienvenida</h2>
                  <p style="font-size: 16px; color: #333333; margin-bottom: 10px;">
                    Como agradecimiento por unirte a nosotros, aquí tienes un cupón de descuento especial:
                  </p>
                  <p style="font-size: 24px; font-weight: bold; color: #000000; text-align: center; letter-spacing: 2px;">
                    ${codigoCupon}
                  </p>
                  <p style="font-size: 14px; color: #666666; text-align: center;">
                    Válido para un 10% de descuento en tu primera compra. ¡No te lo pierdas!
                  </p>
                </div>
                <p style="font-size: 16px; line-height: 1.6; color: #333333; margin-bottom: 20px;">
                  Mantente atento a nuestros correos para recibir las últimas noticias, tutoriales exclusivos y ofertas especiales.
                </p>
                <div style="text-align: center; margin-top: 30px;">
                  <a href="https://translate3d.tech" style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">Explora Nuestro Sitio Web</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="background-color: #000000; color: #ffffff; padding: 20px; text-align: center;">
                <p style="font-size: 14px; margin: 0;">© 2024 Translate3D. Todos los derechos reservados.</p>
                <p style="font-size: 12px; margin-top: 10px;">
                  <a href="https://translate3d.tech/politica-de-privacidad" style="color: #ffffff; text-decoration: underline;">Política de Privacidad</a> |
                  <a href="https://translate3d.tech/terminos-y-condiciones" style="color: #ffffff; text-decoration: underline;">Términos y Condiciones</a>
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ mensaje: 'Correo electrónico enviado con éxito', data });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return NextResponse.json(
      { error: 'Error al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
