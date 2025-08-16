
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Send email notification using Brevo
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: 'Portfolio Contact Form',
          email: 'justinaominisan@gmail.com' // Your verified sender email
        },
        to: [
          {
            email: 'justinaominisan@gmail.com',
            name: 'Justina Ominisan'
          }
        ],
        replyTo: {
          email: email,
          name: name
        },
        subject: `New Contact Form Message from ${name}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">📧 New Contact Form Message</h1>
            </div>
            
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: none; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #4f46e5; margin-top: 0; margin-bottom: 15px;">👤 Contact Details</h3>
                <p style="margin: 8px 0; font-size: 16px;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 8px 0; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></p>
                <p style="margin: 8px 0; font-size: 16px;"><strong>Received:</strong> ${new Date().toLocaleString('en-US', { 
                  timeZone: 'Africa/Lagos',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} (Lagos time)</p>
              </div>
              
              <div style="margin: 25px 0;">
                <h3 style="color: #4f46e5; margin-bottom: 15px;">💬 Message:</h3>
                <div style="background: #ffffff; border: 2px solid #e2e8f0; padding: 20px; border-radius: 8px; white-space: pre-wrap; line-height: 1.6; color: #374151; font-size: 16px;">${message}</div>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <a href="mailto:${email}?subject=Re: Your message via portfolio contact form" 
                   style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
                  ✉️ Reply to ${name}
                </a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #64748b; font-size: 14px; margin: 5px 0;">
                🤖 This email was sent automatically from your portfolio contact form.
              </p>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0;">
                Reply directly to this email to respond to ${name}.
              </p>
            </div>
          </div>
        `,
        textContent: `
New Portfolio Contact Form Message

From: ${name}
Email: ${email}
Received: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' })} (Lagos time)

Message:
${message}

---
Reply to this email to respond to ${name}.
This email was sent automatically from your portfolio contact form.
        `
      })
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Brevo API error:', errorData);
      throw new Error(`Failed to send email: ${errorData.message || emailResponse.statusText}`);
    }

    const emailResult = await emailResponse.json();
    console.log('Email sent successfully:', emailResult);

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! I\'ll get back to you soon.',
      messageId: emailResult.messageId
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? `Failed to send message: ${error.message}` 
          : 'Failed to send message. Please try again or email me directly.'
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({ 
    message: 'Contact API is working!',
    timestamp: new Date().toISOString()
  });
}