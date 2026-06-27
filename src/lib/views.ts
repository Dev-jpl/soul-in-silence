import { supabase } from './supabase'

function parseUA(ua: string) {
  let browser = 'Other'
  if (/edg/i.test(ua)) browser = 'Edge'
  else if (/opr|opera/i.test(ua)) browser = 'Opera'
  else if (/samsungbrowser/i.test(ua)) browser = 'Samsung Internet'
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome'
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox'
  else if (/safari/i.test(ua)) browser = 'Safari'

  let os = 'Other'
  if (/windows/i.test(ua)) os = 'Windows'
  else if (/android/i.test(ua)) os = 'Android'
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS'
  else if (/mac os x|macintosh/i.test(ua)) os = 'macOS'
  else if (/linux/i.test(ua)) os = 'Linux'

  let device = 'Desktop'
  if (/ipad|tablet/i.test(ua)) device = 'Tablet'
  else if (/mobile|iphone|android/i.test(ua)) device = 'Mobile'

  return { os, device, browser }
}

// Resolve the visitor's country once per session via a free IP lookup.
async function getCountry(): Promise<string> {
  try {
    const cached = sessionStorage.getItem('sns_country')
    if (cached) return cached
    const res = await fetch('https://ipwho.is/?fields=country')
    const data = await res.json()
    const country = (data && data.country) || 'Unknown'
    sessionStorage.setItem('sns_country', country)
    return country
  } catch {
    return 'Unknown'
  }
}

// Records a view event in Supabase with OS / device / browser / country context.
export function recordView(kind: 'artwork' | 'page', ref: string) {
  if (!supabase || typeof navigator === 'undefined') return
  const { os, device, browser } = parseUA(navigator.userAgent)
  getCountry().then((country) => {
    supabase!
      .rpc('record_view', {
        p_kind: kind,
        p_ref: ref,
        p_os: os,
        p_device: device,
        p_browser: browser,
        p_country: country,
      })
      .then(({ error }) => {
        if (error) console.error('record_view error', error.message)
      })
  })
}
