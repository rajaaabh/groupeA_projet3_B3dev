<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; }
    .header { background: #0a0a0a; padding: 32px; text-align: center; }
    .logo { font-size: 28px; font-weight: 900; letter-spacing: 4px; color: #fff; }
    .logo span { color: #FF5500; }
    .body { padding: 32px; }
    .body h2 { color: #0a0a0a; margin-top: 0; }
    .body p { color: #444; line-height: 1.6; }
    .btn { display: inline-block; background: #FF5500; color: #fff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px; }
    .footer { background: #0a0a0a; padding: 16px; text-align: center; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">GYM<span>FLOW</span></div>
    </div>
    <div class="body">
      <h2>Bienvenue {{ $user->name }} ! 🎉</h2>
      <p>Nous sommes ravis de vous accueillir sur <strong>GymFlow</strong>, votre plateforme de gestion de salle de sport.</p>
      <p>Votre compte a été créé avec succès. Vous pouvez dès maintenant vous connecter et choisir votre abonnement.</p>
      <a href="http://localhost:5173/login" class="btn">Accéder à mon espace</a>
      <p style="margin-top: 32px;">À très bientôt,<br><strong>L'équipe GymFlow</strong></p>
    </div>
    <div class="footer">
      © {{ date('Y') }} GymFlow — Tous droits réservés
    </div>
  </div>
</body>
</html>
