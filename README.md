# cPanel_ExportDNSZone

Userscript Tampermonkey permettant d’ajouter un bouton **“Exporter la zone DNS”** dans l’interface cPanel, afin d’exporter les enregistrements DNS visibles dans un fichier texte. Attention, l'export ne se fait que sur la page visible.

## Fonctionnalités

* Ajoute un bouton d’export dans l’interface de gestion DNS cPanel
* Récupère les champs :

  * Type
  * Nom
  * Valeur
  * TTL
* Trie les enregistrements par type
* Génère un fichier texte `zone-dns-export.txt`

## Installation

### 1. Installer un gestionnaire de userscripts

Installer l’une des extensions suivantes :

* Tampermonkey
* Violentmonkey
* Greasemonkey

J'ai personnellement développé et testé l'extension que sur Tampermonkey.

### 2. Autoriser l’exécution des userscripts

Sur les navigateurs basés sur Chromium, par exemple Chrome, Edge ou Brave, il peut être nécessaire d’activer les autorisations liées aux userscripts.

Dans Chrome ou Edge :

1. Ouvrir la page des extensions :

   * Chrome : `chrome://extensions`
2. Activer le **mode développeur**
3. Ouvrir les détails de l’extension Tampermonkey
4. Activer l’option **Allow user scripts** / **Autoriser les scripts utilisateur** si elle est disponible

Selon la version du navigateur, cette autorisation peut être requise pour permettre à Tampermonkey d’injecter correctement les userscripts.

### 3. Ajouter le script

1. Ouvrir le tableau de bord Tampermonkey
2. Créer un nouveau script
3. Coller le contenu du fichier `cPanel_ExportDNSZone.user.js`
4. Enregistrer le script
5. Vérifier que le script est activé

## Utilisation

1. Ouvrir l’interface cPanel
2. Aller dans la gestion de zone DNS (Zone Editor)
3. Le bouton **“Exporter la zone DNS”** apparaît sur la page après le chargement de cette dernière
4. Cliquer sur le bouton
5. Un fichier `zone-dns-export.txt` est téléchargé automatiquement

## Compatibilité

Ce script dépend de la structure HTML de l’interface cPanel.
Si cPanel modifie les noms de colonnes, les classes CSS ou la structure du tableau DNS, le script peut nécessiter une mise à jour.

## Licence

Ce projet est distribué sous licence MIT.

Vous êtes libre de l’utiliser, le modifier et le redistribuer, à condition de conserver la mention de l’auteur et la notice de licence.

Auteur : YannTo2
GitHub : https://github.com/YannTo2
