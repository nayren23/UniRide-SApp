# UniRide-SApp
Service Applicatif de l'application web UniRide
Ce projet a été généré avec Angular CLI version 16.2.8.

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com) ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg) 
## Comment l'exécuter en local
### Prérequis

- Installez [Node.js], qui inclut [Node Package Manager][npm].

1. Clonez le [dépôt](https://github.com/DUT-Info-Montreuil/UniRide-SApp.git) sur votre machine locale :
```bash
$ git clone https://github.com/DUT-Info-Montreuil/UniRide-SApp.git
```

2. Exécutez la commande `npm install` à l'intérieur du dossier cloné :
```bash
$ npm install
```
# Génération de code
Exécutez `ng generate component nom-du-composant` pour générer un nouveau composant. Vous pouvez également utiliser `ng generate directive|pipe|service|class|guard|interface|enum|module`.

# PrimeNG
Si vous voulez importer des modules, il faudra dans le fichier `/shared.module.ts` importer le module que vous voulez :`import {Module} from primeng/module` ensuite l'ajouter dans `@NgModule({exports: [module]})`.

# Démarrer le serveur
Vous pouvez démarrez le serveur de développement en exécutant la commande ci-dessous. Accédez à `https://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez l'un des fichiers source. 
```bash
$ ng serve --ssl true --ssl-cert "chemin/vers/votre/certificat.crt" --ssl-key "chemin/vers/votre/cle.key" --host "0.0.0.0"
```
Assurez-vous de remplacer "chemin/vers/votre/certificat.crt" par le chemin réel de votre certificat SSL et "chemin/vers/votre/cle.key" par le chemin réel de votre clé SSL

# Déploiement avec docker 
Pour lancer entièrement l'application UniRide avec docker, vous pouvez vous référer à ce read me [Docker](https://github.com/DUT-Info-Montreuil/UniRide-DEPLOYMENT/blob/main/README.md).

# License
Sous license GNU [GNU GPL3](https://opensource.org/license/gpl-3-0/).

# Besoin d'aide ?
Pour obtenir davantage d'aide sur Angular CLI, utilisez la commande `ng help` ou consultez le README d'Angular CLI [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Pour obtenir davantage d'aide sur PrimeNG, consultez le site [PrimeNG](https://primeng.org/support).

[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/get-npm


## Auteur
- [CHOUCHANE Rayan / Nayren23](https://github.com/Nayren23)
- [HAMIDI Yassine / TheFanaticV2](https://github.com/TheFanaticV2)
- [BOUAZIZ Ayoub / Ayoub-Bouaziz](https://github.com/Ayoub-Bouaziz)
- [YANG Steven / G8LD](https://github.com/G8LD)
- [FAURE Grégoire / Pawpawzz](https://github.com/Pawpawzz)