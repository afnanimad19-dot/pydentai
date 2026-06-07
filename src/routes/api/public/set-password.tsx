import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/public/set-password')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { email, password } = await request.json()
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
        
        const { data: listData } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
        const existingUser = listData?.users?.find((u: any) => u.email === email)
        
        if (existingUser) {
          const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
            existingUser.id,
            { password }
          )
          if (updateError) {
            return new Response(JSON.stringify({ error: updateError.message }), { status: 400 })
          }
          return new Response(JSON.stringify({ success: true, action: 'password_updated' }), { status: 200 })
        }
        
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        })
        
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), { status: 400 })
        }
        
        return new Response(JSON.stringify({ success: true, action: 'user_created' }), { status: 200 })
      }
    }
  }
})

