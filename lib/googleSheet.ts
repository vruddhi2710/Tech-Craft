type InquirySheetRow = {
  id: string
  submittedAt: string
  name: string
  address: string
  course: string
  courseTitle: string
  email: string
  phone: string
  message: string
  notifyEmail: string
}

type SheetResult = {
  appended: boolean
  reason?: string
}

export async function appendInquiryToGoogleSheet(inquiry: InquirySheetRow): Promise<SheetResult> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  const secret = process.env.GOOGLE_SHEET_WEBHOOK_SECRET

  if (!webhookUrl) {
    return {
      appended: false,
      reason: 'GOOGLE_SHEET_WEBHOOK_URL is not configured.',
    }
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret,
        inquiry,
      }),
    })

    if (!response.ok) {
      return {
        appended: false,
        reason: `Google Sheet webhook returned ${response.status}.`,
      }
    }

    return {
      appended: true,
    }
  } catch (error) {
    return {
      appended: false,
      reason: error instanceof Error ? error.message : 'Google Sheet webhook failed.',
    }
  }
}
