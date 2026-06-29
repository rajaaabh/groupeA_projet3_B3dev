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
    .detail { background: #f9f9f9; border-radius: 6px; padding: 16px; margin: 20px 0; }
    .detail p { margin: 4px 0; color: #333; font-size: 14px; }
    .footer { background: #0a0a0a; padding: 16px; text-align: center; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">GYM<span>FLOW</span></div>
    </div>
    <div class="body">
      <h2>Nouvelle connexion détectée 🔐</h2>
      <p>Bonjour <strong>{{ $user->name }}</strong>,</p>
      <p>Une nouvelle connexion a été effectuée sur votre compte GymFlow.</p>
      <div class="detail">
        <p><strong>Date :</strong> {{ now()->format('d/m/Y à H:i') }}</p>
        <p><strong>Email :</strong> {{ $user->email }}</p>
      </div>
      <p>Si ce n'était pas vous, contactez-nous immédiatement.</p>
      <p>À très bientôt,<br><strong>L'équipe GymFlow</strong></p>
    </div>
    <div class="footer">
      © {{ date('Y') }} GymFlow — Tous droits réservés
    </div>
  </div>
</body>
</html>
