# Fafurion Realm

Πλήρης εξαγωγή του website και του demo portal στις 27/09/2026.
Περιλαμβάνει Home, Info, Rankings, Download, Account και Admin panel,
εικόνες και επιλογή English / Ελληνικά / Português (Brasil) / Русский.

## Ανέβασμα στο GitHub

1. Κάνε αποσυμπίεση του ZIP.
2. Δημιούργησε ένα repository στο GitHub.
3. Ανέβασε τα περιεχόμενα του φακέλου Fafurion-GitHub στη ρίζα του repository.
   Το index.html πρέπει να βρίσκεται στη ρίζα, όχι μέσα σε επιπλέον φάκελο.
4. Κάνε commit τα αρχεία. Το ZIP είναι για μεταφορά: μην ανεβάσεις μόνο το ZIP.

Δεν χρειάζεται npm install ή build. Είναι HTML, CSS και JavaScript.
Για τοπική δοκιμή, από αυτόν τον φάκελο:

```sh
python -m http.server 8080
```

Άνοιξε http://localhost:8080.
Για cPanel/VPS, το περιεχόμενο αυτού του φακέλου αποτελεί το web root.
Οι πραγματικοί σύνδεσμοι download ρυθμίζονται στο config.js.

## Demo και παραγωγή

Το account και το admin είναι διαδραστικά demos. Δεν περιλαμβάνεται πραγματική
πιστοποίηση χρήστη, ασφαλές backend admin, βάση παιχνιδιού ή πληρωμές.
Το DemoAccount ανοίγει από το Account στο μενού. Οι αλλαγές των demo λειτουργιών
αποθηκεύονται κατά περίπτωση στον browser και δεν επηρεάζουν gameserver.
Μην προσθέτεις DB passwords, API keys ή SSH keys στα αρχεία του website.

Περισσότερα για τη δομή και τις υπάρχουσες δοκιμές στο PROJECT-NOTES.md.
