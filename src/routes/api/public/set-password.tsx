import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/public/set-password')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { email, password } = await request.json()
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
        
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        })
        
        if (error) {
          if (error.message?.includes('already been registered')) {
            // User exists, update password
            const { data: userData } = await supabaseAdmin.auth.admin.listUsers({
              filters: { email: email }
            })
            if (userData?.users?.[0]?.id) {
              const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
                userData.users[0].id,
                { password }
              )
              if (updateError) {
                return new Response(JSON.stringify({ error: updateError.message }), { status: 400 })
              }
              return new Response(JSON.stringify({ success: true, action: 'password_updated' }), { status: 200 })
            }
          }
          return new Response(JSON.stringify({ error: error.message }), { status: 400 })
        }
        
        return new Response(JSON.stringify({ success: true, action: 'user_created' }), { status: 200 })
      }
    }
  }
})
