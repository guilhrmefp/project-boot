# Beta #
(https://css-tricks.com/gulp-for-beginners/)

## Pré-requisitos: ##
* Git (versionamento) - https://git-scm.com/
* Node JS (base para o Gulp) - https://nodejs.org/
* Gulp (via linha de comando):
```
npm install gulp -g //Caso já tenho o gulp instalado globalmente, ignorar este comando
```

## Preenchendo os pré-requisitos, instalar módulos (presentes no arquivo package.json) ##
```
npm install
```

## Tasks específicas ##
* **sass**        => Gera e minifica CSS com vendor prefixes e sourcemap
* **uglify**      => Minifica JS com sourcemap
* **handlebars**  => Gera o html das partials
* **images**      => Move as imagens da pasta 'src/img' para 'dist/img'
* **fonts**       => Move os arquivos de fonte da pasta 'src/img' para 'dist/img'
* **clean:dist**  => Apaga o diretório 'dist'
* **clean:cache** => Limpa o cache do Gulp
* **browserSync** => live-reload para os browsers
* **watch**       => Arquivos que devem ter modificações vigiadas

## Tasks produção ##
* **build**       => Compila todo o projeto para produção
* **default**     => Compila todo o projeto (task 'build') e roda as tasks 'browserSync' e 'watch' para desenvolvimento

## Pastas ignoradas no versionamento: ##
* .sass-cache/ **-->** *(cache criado pelo sass)*
* node_modules/ **-->** *(packages usados no projeto depois de 'npm install')*
* npm-debug.log **-->** *(log do node)*
* \*\*/_notes **-->** *(arquivos geralmente criados pelo Dreamweaver)*
* dist/ **-->** *(pasta final com arquivo compilados)*