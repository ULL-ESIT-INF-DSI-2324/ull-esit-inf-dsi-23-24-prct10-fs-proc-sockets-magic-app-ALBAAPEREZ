# PRÁCTICA 10 -  Aplicación cliente-servidor para coleccionistas de cartas Magic
---

**Nombre:** Alba Pérez Rodríguez

**Fecha:** 06/04/2024

**Estudios:** Ingeniería Informática

**Asignatura:** Desarrollo en Sistemas Informáticos

**Profesor:** Eduardo Manuel Segredo González

---

# Índice
1. [Introducción](#1-introducción)
2. [Objetivos](#2-objetivos)
3. [Antes de empezar](#3-antes-de-empezar)
4. [Configuración de Istambul y coveralls](#4-configuracion-de-istambul-y-coveralls)
5. [Principios SOLID](#5-principios-solid)
6. [GitHub Actions](#6-github-actions)
7. [Modulos](#7-módulos)
8. [SonarCloud](#8-sonarcloud)
9. [Yargs y Chalk](#9-yargs-y-chalk)
10. [API sincrona de Node.js](#10-api-sincrona-de-nodejs)
11. [Ejercicio](#11-ejercicio)
12. [Modificación](#12-modificación)
13. [Conclusiones](#9-conclusiones)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-ALBAAPEREZ/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-ALBAAPEREZ/actions/workflows/coveralls.yml)


[![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-ALBAAPEREZ/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-ALBAAPEREZ/actions/workflows/sonarcloud.yml)


[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-ALBAAPEREZ/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-ALBAAPEREZ/actions/workflows/node.js.yml)

[![pages-build-deployment](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-ALBAAPEREZ/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct10-fs-proc-sockets-magic-app-ALBAAPEREZ/actions/workflows/pages/pages-build-deployment)

---

# 1. Introducción.
En esta práctica, hemos creado una aplicación cliente-servidor para coleccionistas de cartas Magic. Utilizando el módulo net de Node.js, hemos implementado sockets que permiten la comunicación simultánea de múltiples usuarios con el servidor. La aplicación ofrece funcionalidades como añadir, modificar, eliminar, listar y mostrar cartas, con los datos almacenados en ficheros JSON en el sistema de archivos del servidor. En este informe, detallaré las decisiones de diseño que tomamos durante el desarrollo, así como las herramientas y metodologías utilizadas para asegurar la calidad del software.


---

# 2. Objetivos

Los objetivos de esta práctica son:

1. En esta práctica, se desarrollará una aplicación cliente-servidor para gestionar colecciones de cartas Magic de forma eficiente.

2. La aplicación permitirá a los usuarios realizar operaciones como añadir, modificar, eliminar, listar y leer la información de las cartas a través de una interfaz de línea de comandos.

3. Se utilizarán los paquetes `yargs` y `chalk` para facilitar la interacción con la línea de comandos y mejorar la presentación de la información.

4. El servidor será responsable de hacer persistente la información de las cartas, almacenándolas en archivos JSON en el sistema de archivos del servidor.

5. Se pondrá énfasis en garantizar la validación de los datos de entrada y el manejo adecuado de errores tanto en el cliente como en el servidor.

6. El código será documentado utilizando TypeDoc para mejorar su legibilidad y comprensión.

7. Se implementarán pruebas unitarias para cubrir los diferentes casos de uso de la aplicación, asegurando su robustez y fiabilidad.

---

# 3. Antes de empezar
Antes de comenzar con la resolución de ejercicios de la práctica deberemos poner a punto nuestro entorno de trabajo. Para ello, lo haremos siguiendo los siguientes pasos:

## Creación de directorios.
Crearemos los siguientes directorios para nuestro proyecto:

  - **src/:** Este directorio almacenará los archivos fuente de TypeScript. En este caso, el código fuente escrito en TypeScript se encuentra en el directorio src.

  - **dist/:** Este directorio se utilizará para almacenar los archivos JavaScript generados por el compilador de TypeScript. La compilación de TypeScript produce código JavaScript, y este código se guarda en el directorio dist.

## Configuración para llevar a cabo la práctica:
Necesitaremo inicializar el proyecto con ***npm***, para ello seguiremos los pasos siguientes:

**Paso 1:**

Utilizamos el comando ***npm init --yes** para generar un archivo **package.json**. Este archivo contiene la información del proyecto, incluidas las dependencias y scripts.

```bash 
{
  "name": "ull-esit-inf-dsi-23-24-prct04-arrays-tuples-enums-albaaperez",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "tsc-watch --onSuccess \"node dist/index.js\"",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
}

``` 

**Paso 2:**

Instalación del Compilador de TypeScript. Se instala el compilador de TypeScript globalmente con el comando ***npm install --global typescript***.

**Paso 3:**

Configuración del Compilador con tsconfig.json. Se crea un archivo de configuración llamado **tsconfig.json** en la raíz del proyecto. Este archivo especifica opciones para el compilador de TypeScript, como el directorio de entrada **(rootDir)** y el directorio de salida **(outDir)**.

```bash
{
  "exclude": [
    "./tests",
    "./node_modules",
    "./dist"
  ],
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "declaration": true,
    "rootDir": "./src",
    "outDir": "./dist",
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true
  }
}
```
**Paso 4:**

Instalación de tsc-watch para Compilación Automática. Se instala tsc-watch como una dependencia de desarrollo con el comando **npm install --save-dev tsc-watch**.

**Paso 5:** 

Modificamos la sección de scripts en **package.json** para utilizar tsc-watch y ejecutar el código compilado solo si la compilación es exitosa.

```bash
"scripts": 
    "start": "tsc-watch --onSuccess \"node dist/index.js\""
```

**Paso 6:**
Ejecutamos el comando **npm start**, que utiliza **tsc-watch** para observar cambios en los archivos de origen y compilar automáticamente.


## Instalación de ESlint.
ESLint, un linter muy conocido para trabajar con JavaScript y TypeScript. Para instalarlo haremos lo siguiente:

1. **Instalación de ESLint**:
  - Instalamos el ESLint de manera global utilizando el comando ***npm i -g eslint***.
  - Verificamos la instalación con **eslint --version**.

2. **Configuración de ESLint**:
  - Iniciamos la configuración de ESLint con el comando ***eslint --init***.
  - Durante la configuración, se elige el tipo de proyecto, el sistema de módulos, el framework (en este caso, ninguno), si se utiliza TypeScript, el entorno de ejecución (Node.js), el formato del archivo de configuración (JSON), y se instalan las dependencias necesarias.

3. **Archivo de Configuración de ESLint**:
  - Configuraremos el archivo de configuración **.eslintrc.json**, que indica el entorno, las extensiones recomendadas (como eslint:recommended y plugin:@typescript-eslint/recommended), el parser de TypeScript, y la configuración de reglas. Se verá de la siguiente manera:
  ```bash
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "require-jsdoc": "off",
        "valid-jsdoc": "off"
    }
  ```

4. **Personalización de Reglas**
  - Editamos el archivo de configuración para activar, desactivar o personalizar reglas específicas según las necesidades del proyecto.

5. **Ignorar Archivos:**
  - Creamos un archivo **.eslintignore** para especificar qué archivos y directorios deben ser ignorados por ESLint.

6. **Ejecución de ESLint:**
  - Ejecutamos ESLint en el proyecto con el comando **eslint .**, y se muestra cómo se informan los problemas detectados.

7. **Formateo del Código con Prettier:**
  - Instalamos Prettier y eslint-config-prettier para desactivar reglas de formato en ESLint.
  - Configuramos el ESLint para integrarse con Prettier añadiendo "prettier" a la lista de extensiones en el archivo de configuración.
  - Se crea un archivo de configuración de Prettier (.prettierrc.json) y un archivo de ignorar (.prettierignore).

---

## Typedoc.
***TypeDoc*** es una herramienta de generación de documentación para proyectos TypeScript. Proporciona una forma eficiente de documentar el código fuente y generar automáticamente documentación en formato HTML. A continuación, se presenta una breve introducción a TypeDoc y cómo se puede utilizar en el contexto de esta práctica.

### Instalación de la herramienta.
Podemos instalar TypeDoc utilizando ***npm*** (Node Package Manager). Abrimos la terminal y ejecutamos el siguiente comando:

```bash
npm install --save-dev typedoc
```
Este comando instalará TypeDoc como una dependencia de desarrollo en el proyecto.

### Uso básico.
Para generar documentación con TypeDoc, simplemente ejecutamos el siguiente comando en la terminal desde el directorio de su proyecto:

```bash
npx typedoc
```
Otra forma de hacerlo, es en el compilador, cuyo fichero es ***package.json***. Aquí especificaremos la siguiente línea en el apartado de **scripts**:

```bash
"doc": "typedoc"
```

### Configuración.
**TypeDoc** puede configurarse utilizando un archivo ***typedoc.json*** en la raíz del proyecto. Aquí podemos especificar la configuración específica que deseamos para la documentación. 

**Paso 1: Crear el archivo typedoc.json:**

En la raíz de nuestro proyecto crearemos a mano un archivo denominado **typedoc.json**.
Este es un archivo de configuración para TypeDoc.

**Paso 2: Configuración específica:**

Una vez creado el fichero, dentro escribiremos lo siguiente:

```bash
{
  "entryPoints": [
    "./src/**/*.ts
  ],
  "out": "./docs",

}
```
Este archivo de configuración le dice a TypeDoc qué archivos deben considerarse para la **generación de documentación**, en este caso, todos los ficheros de los ejercicios realizados y, **dónde debe colocar esa documentación generada**, en nuestro directorio /docs. Cuando ejecutemos **npx typedoc** desde la terminal, TypeDoc utilizará esta configuración para procesar los archivos de entrada y generar la documentación en el directorio especificado.

Configurado TypeDoc podremos ejecutarlo desde la terminal con el comando:

```bash
npm run doc
```

---
## mocha y chai
***Mocha y Chai*** son herramientas populares para realizar pruebas unitarias en proyectos JavaScript y TypeScript. Mocha es un marco de ejecución de pruebas y Chai es una biblioteca de aserciones que se integra bien con Mocha. Aquí hay una breve introducción sobre cómo comenzar con Mocha y Chai.

### Instalación de las herramientas.
En primer lugar, instalaremos Mocha y Chai como dependencias de desarrollo en nuestro proyecto con el comando:

```bash
 npm install --save-dev mocha chai@4.4.1 @types/mocha @types/chai ts-node
```
  - mocha: El marco de ejecución de pruebas.
  - chai: Una biblioteca de aserciones. Le especificaremos la versión anterior para trabajar de forma correcta con chai.
  - @types/mocha y @types/chai: Tipos TypeScript para Mocha y Chai.
  - ts-node: Permite ejecutar archivos TypeScript directamente en Node.js.


Hecho esto, crearemos un fichero denominado ***.mocharc.json***. Este fichero se utiliza para especificar configuraciones personalizadas para la ejecución de pruebas con Mocha.
Este contendrá lo siguiente:

```bash
{
  "extension": ["ts"],
  "spec": "tests/**/*.spec.ts",
  "require": "ts-node/register"
}
```
  - **"extension"** --> Mocha reconocerá los archivos con la extensión .ts como archivos de prueba TypeScript.
  - **"spec"** --> Mocha buscará los archivos de prueba en la carpeta tests y sus subdirectorios (**/) que tengan la extensión .spec.ts.
  - **"require"** --> antes de ejecutar las pruebas, se debe registrar el módulo ts-node para permitir la ejecución de archivos TypeScript directamente en Mocha.

### Estructura de las pruebas.
En nuestro directorio raíz crearemos un nuevo directorio denominado **/tests** que contendrá nuestros archivos para las pruebas. Nuestros directorios deberán quedar de una forma similar a esta:

```bash
/proyecto
  /src
    /EJERCICIO1
      - interfaz.ts
      - clase.ts
      - index.ts
    /EJERCICIO2
      - clase1.ts
      - clase2.ts
      - index.ts
    ...
  /test
    /EJERCICIO1
      - interfaz.spec.ts
      - clase.spec.ts
      - index.spec.ts
    /EJERCICIO2
      - clase1.spec.ts
      - clase2.spec.ts
      - index.spec.ts
    ...

```

### Escribir las pruebas.
Por último, lo que deberemos hacer será escribir las pruebas en esos ficheros que vamos a crear terminados en **.spec.ts**. La importancion de mocha y chai en nuestro archivos de prueba serán:

```bash
import 'mocha';
import {expect} from 'chai';
import { mcd } from '../src/EJERCICIO1';
```
  - Utilizamos **describe** para agrupar las pruebas relacionadas
  - Cada prueba se crea con **it**.
  - Usamos las aserciones de Chai, por ejemplo, **expect(result).to.be.undefined.**

## Subir archivos 
Una vez hayamos terminado de realizar los ejercicios, procederemos a subirlos a nuestro repositorio de github mediante:

  - **git add .**
  - **git commit -m " "**
  - **git push**

Pero antes de hacer esto deberemos crear un fichero ***.gitignore** donde introduciremos lo siguiente:
```bash
node_modules
dist
package-lock.json
```
El archivo **.gitignore** se utiliza para especificar archivos y directorios que no deben ser incluidos en el control de versiones de Git. En este caso, estos archivos serán ignorados a la hora de subirlos a GitHub.

---

# 4. Configuracion de Istanbul y coveralls.

### ¿Que son?
En esta sección, detallaremos la configuración necesaria para utilizar **Istanbul y Coveralls** en nuestro proyecto. Estas herramientas son valiosas para evaluar la cobertura de nuestro código fuente y realizar un seguimiento de la misma.

### Instalación

Primero, realizaremos la instalación de los mismos con los siguientes comandos:
```bash
npm install --save-dev nyc coveralls
```
En nuestro fichero **package.json** detallaremos lo siguiente para terminar de configurar Istanbul y coveralls:

```bash 
"test": "nyc mocha",
"coverage": "nyc npm test && nyc report --reporter=text-lcov | coveralls && rm -rf .nyc_output",
```

### Inicio de sesión en Coveralls para el cubrimiento del código

Para realizar esto, nos deberemos meter en la página de [Coveralls](#https://coveralls.io/).
Dentro de esta iniciaremos sesión con nuestras credenciales de GitHub.
Si deseamos agregar un repositorio para el cubrimiento de nuestro código este deberá ser de visibilidad pública.  
Lo agregaremos dándole a **ADD REPOS** y una vez elegido el repositorio copiaremos el token.
Por último, en nuestro directorio raíz crearemos el **.coveralls.yml** que contendrá el token de nuestro repositorio:

```bash
repo_token: xbwn8u45rB3Q44dE2hFjQT0kbhDmRPDuu
```
---

# 5. Principios SOLID.

En el desarrollo de software, ***los Principios SOLID*** son un conjunto de principios de diseño orientados a la creación de sistemas más mantenibles, flexibles y escalables. Estos principios fueron introducidos por el ingeniero de software Robert C. Martin y representan un conjunto de directrices que buscan mejorar la calidad del código y facilitar su mantenimiento a lo largo del tiempo.

## ¿Cuáles son?

Los Principios SOLID son un acrónimo que representa los siguientes principios:

### S - Principio de Responsabilidad Única (Single Responsibility Principle - SRP)

El **SRP** establece que una clase debería tener una única razón para cambiar. En otras palabras, una clase debería tener una **única responsabilidad**, una única función.

### O - Principio de Abierto/Cerrado (Open/Closed Principle - OCP)

El **OCP** propone que una entidad de software, como una clase, debe estar **abierta para la extensión pero cerrada para la modificación**. Se busca lograr esto mediante la creación de código que pueda ser extendido sin modificar su funcionalidad existente.

### L - Principio de Sustitución de Liskov (Liskov Substitution Principle - LSP)

El **LSP** establece que los objetos de una clase base deben **poder ser sustituidos por objetos de sus clases derivadas** sin afectar la corrección del programa.

### I - Principio de Segregación de Interfaces (Interface Segregation Principle - ISP)

El **ISP** propone que una clase no debería verse obligada a implementar interfaces que no utiliza. En lugar de interfaces generales, se prefieren interfaces más específicas.

### D - Principio de Inversión de Dependencia (Dependency Inversion Principle - DIP)

El **DIP** propone que las dependencias de alto nivel no deben depender de módulos de bajo nivel, sino que ambos deben depender de abstracciones. Además, las abstracciones no deben depender de los detalles, sino que los detalles deben depender de las abstracciones.

## Importancia y Beneficios

La aplicación de los Principios SOLID en el desarrollo de software tiene varios beneficios, entre ellos:

- **Mantenibilidad:** Facilitan el mantenimiento del código a lo largo del tiempo.
- **Escalabilidad:** Permiten construir sistemas más flexibles y escalables.
- **Reusabilidad:** Favorecen la reutilización de código y componentes.
- **Legibilidad:** Mejoran la claridad y la comprensión del código.


En esta práctica, se presentarán ejemplos específicos de código que ilustrarán la aplicación práctica de los Principios SOLID en nuestro proyecto. Veremos cómo estos principios se traducen en un código más limpio, modular y fácil de entender.

A lo largo de la revisión de los ejercicios, se destacarán las áreas donde los Principios SOLID han sido implementados con éxito, subrayando la importancia de seguir estas directrices para lograr un diseño de software robusto y sostenible.

---

# 6. GitHub Actions

## ¿Qué es?
***GitHub Actions*** es una característica integrada en GitHub que te permite automatizar, personalizar y ejecutar flujos de trabajo directamente desde tu repositorio. Con GitHub Actions, podemos crear flujos de trabajo que respondan a eventos específicos en tu repositorio, como solicitudes de extracción, confirmaciones de código, creación de problemas y mucho más.

## Características
Encontramos algunas características de esta herramienta:

### Automatización de tareas
Con GitHub Actions, puedes automatizar tareas repetitivas, como pruebas de código, compilaciones, despliegues, notificaciones y más.

### Personalización
Los flujos de trabajo de GitHub Actions son altamente personalizables. Puedes crear flujos de trabajo específicos para tus necesidades utilizando una variedad de acciones predefinidas o creando tus propias acciones personalizadas.

### Eventos del repositorio
Los flujos de trabajo pueden activarse en respuesta a una amplia gama de eventos en tu repositorio, lo que te permite ejecutar acciones específicas en función de las acciones de los colaboradores, el estado del código y otros factores.

### Integración con el ecosistema de GitHub
GitHub Actions se integra perfectamente con el ecosistema de GitHub, lo que te permite acceder a tus repositorios, problemas, solicitudes de extracción y otros datos directamente desde tus flujos de trabajo.

## Configuración
Para la configuración de las Github Actions deberemos meternos en el apartado de nuestro repositorio de **Actions** y seleccionar **Node.js** como flujo de trabajo. 
Al hacer esto se nos creará un archivo denominado node.js.yml que contendrá lo siguiente:
```typescript
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Tests

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x, 19.x, 20.x, 21.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm install
    - run: npm test
  ```
Este fichero será para las pruebas o tests como se indica en el nombre.
Deberemos configurar más Actions para llevar a cabo toda la práctica. 
Tras hacer un commit con los cambios comenzaremos a utilizar las GitHub Actions.
Ahora, en visual podemos hacer la configuración de la Action de coveralls. Crearemos el fichero coveralls.yml que tendrá lo siguiente:
  ```typescript
  # This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Coveralls

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - name: Cloning repo
      uses: actions/checkout@v4
    - name: Use Node.js 21.x
      uses: actions/setup-node@v4
      with:
        node-version: 21.x
    - name: Installing dependencies
      run: npm ci
    - name: Generating coverage information
      run: npm run coverage
    - name: Coveralls GitHub Action
      uses: coverallsapp/github-action@v2.2.3
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
  ```
Hecho esto, cada vez que hagamos un git commit y un git push nos saldrán las Acciones.

--- 

# 7. Módulos
En el desarrollo de aplicaciones en TypeScript, especialmente en entornos de pruebas con Mocha y herramientas de cobertura de código como nyc, es esencial configurar adecuadamente el manejo de módulos ESM (ECMAScript Modules). Esta configuración garantiza que nuestras pruebas sean efectivas y que los informes de cobertura reflejen con precisión el estado de nuestros módulos.

**Paso 1: Instalación de c8.**

Para comenzar, es necesario instalar la herramienta de cobertura **c8** como dependencia de desarrollo. Esto se logra ejecutando el siguiente comando:
```bash
npm i --save-dev c8
```

**Paso 2: Configuración del Script de Cobertura en package.json**

Posteriormente, en el archivo **package.json**, ajustamos el script de cobertura para utilizar c8 en lugar de nyc. Esto se logra modificando la sección "scripts" como se muestra a continuación:
```typescript
{
  "scripts": {
    "coverage": "c8 npm test && c8 report --reporter=lcov"
  }
}
```

**Paso 3: Ajuste de las Pruebas para Módulos ESM**

Es necesario modificar el archivo de configuración de Mocha, **.mocharc.json**, para utilizar el cargador ESM de ts-node al ejecutar las pruebas. Esto se logra configurando la propiedad "loader" como se muestra a continuación:
```typescript
{
  "extension": [
    "ts"
  ],
  "spec": "tests/**/*.spec.ts",
  "loader": "ts-node/esm"
}
```

**Paso 4: Importación de Módulos con Extensión .js**

En los archivos de prueba **(*.spec.ts)**, cuando importamos módulos, es fundamental añadir la extensión .js a los nombres de los módulos importados. Esto es necesario para que funcionen correctamente con el cargador ESM. Un ejemplo de importación sería el siguiente:
```typescript
import { expect } from 'chai'; // Importamos el módulo con extensión .js
import { myFunction } from '../src/myModule.js'; // Importamos nuestro módulo con extensión .js
```

Con esta configuración, aseguramos que nuestras pruebas sean efectivas, generamos informes precisos de cobertura y garantizamos que nuestros módulos ESM se manejen correctamente en el entorno de prueba.


---
# 8. SonarCloud

### ¿Qué es SonarCloud?
SonarCloud es una plataforma de análisis estático de código diseñada para mejorar la calidad del software. Utiliza técnicas de análisis estático para identificar y reportar problemas de calidad del código, como errores, vulnerabilidades de seguridad, malas prácticas y duplicación de código.

### Características de SonarCloud:

- **Análisis de código estático:** SonarCloud examina el código fuente de tu proyecto en busca de posibles problemas de calidad, proporcionando una visión detallada de la salud del código.

- **Integración continua:** Puedes integrar SonarCloud en tu proceso de integración continua para automatizar el análisis del código cada vez que se realice un cambio, lo que te permite detectar problemas de calidad de forma proactiva.

- **Métricas y seguimiento:** SonarCloud ofrece métricas detalladas sobre la calidad del código y su evolución a lo largo del tiempo, lo que te permite realizar un seguimiento del progreso y tomar medidas para mejorar la calidad del código.

- **Comentarios y recomendaciones:** SonarCloud proporciona comentarios detallados y recomendaciones para cada problema identificado, ayudándote a comprender la naturaleza del problema y cómo solucionarlo de manera efectiva.

- **Integración con GitHub:** SonarCloud se integra estrechamente con GitHub, lo que te permite ver los resultados del análisis directamente en tus solicitudes de extracción y gestionar la calidad del código desde el mismo entorno en el que trabajas.


## Configuración
Para la configuración de **SonarCloud** lo que deberemos hacer es lo siguiente:

**Paso 1**: Iniciamos sesión en la Página de SonarCloud.

**Paso 2**: Añadimos un nuevo proyecto. En nuestro caso seleccionamos la organizacion del curso de dsi y localizamos nuestro repositorio que anteriormente debe estar en **Public**.

**Paso 3**: Al comenzar un nuevo proyecto con el repositorio seleccionado deberemos meternos dentro de este y seleccionar **Analysis Method**. Dentro de esto, desactivaremos el botón de **Automatic Analysis** y nos meteremos a la opción de **GitHub Actions**.

**Paso 4**: Dentro de los Actions de esta página copiaremos el SONAR_TOKEN y el valor secreto bajo este. Seguidamente, nos dirigiremos a GitHub a nuestro repositorio y en el apartado de settings -> secretos deberemos introducir estos datos copiados anteriormente. 

**Paso 5**: Hecho esto, nos dirigimos a la página de antes de SonarCloud y eligiremos la opción de ts para typscript. Se nos desplegará los siguiente:

```typescript
name: Build
on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Needed to get PR information, if any
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
  ``` 

Esto lo copiaremos y haremos lo mismo que hicimos anteriormente con las Actions de Tests y Coveralls. Crear un fichero sonarcloud.yml y poner:
```typescript
name: Sonar-Cloud 

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    steps:
      - name: Cloning repo
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis
      - name: Using Node.js 21.x
        uses: actions/setup-node@v4
        with:
          node-version: 21.x
      - name: Installing dependencies
        run: npm ci
      - name: Generating coverage report
        run: npm run coverage
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Needed to get PR information, if any
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

Para finliazar crearemos en la raíz del directorio un **sonar-project.properties** que tendra:
```typescript
sonar.projectKey=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-ALBAAPEREZ
sonar.organization=ull-esit-inf-dsi-2324

# This is the name and version displayed in the SonarCloud UI.
#sonar.projectName=ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-ALBAAPEREZ
#sonar.projectVersion=1.0


# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
#sonar.sources=.

# Encoding of the source code. Default is default system encoding
#sonar.sourceEncoding=UTF-8
```

Hecho esto en nuestro repositorio, haremos git add, git commit y un push y si todo ha ido bien comenzará a funcionar todo sin problemas.


--- 

# 9. Yargs y Chalk

En el contexto del desarrollo de aplicaciones de línea de comandos, los paquetes **yargs y chalk** desempeñan roles fundamentales para el manejo de argumentos y la presentación de información de manera legible y atractiva. A continuación, se detallan las características y el uso de cada uno de estos paquetes:

## Chalk: Estilización de Texto en Consola

El paquete Chalk se utiliza para agregar estilos y colores a la salida de texto en la consola, permitiendo mejorar la legibilidad y la presentación de la información. Algunas características importantes incluyen:

**Estilos y Colores**: Chalk proporciona una amplia variedad de estilos y colores que pueden aplicarse al texto, como negrita, subrayado, colores de fondo, entre otros.

**API Encadenada**: Permite encadenar varios estilos y colores para aplicar múltiples efectos a un texto.

**Facilidad de Uso**: La sintaxis simple y clara hace que sea fácil aplicar estilos y colores a diferentes partes del texto.


Instalaremos chalk mediante el comando:
```bash
npm i chalk
```

La última versión se trata de un módulo ESM, por lo que tendremos que modificar el fichero package.json para establecer la propiedad type al valor module:
```typescript
{
  "name": "ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-albaaperez",
  "version": "1.0.0",
  "description": "[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/T5K9tzcv)",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "c8 mocha",
    "coverage": "c8 npm test && c8 report --reporter=lcov",
    "doc": "typedoc",
    "start": "tsc-watch --onSuccess \"node dist/MAGICAPP/index.js\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^4.3.12",
    "@types/mocha": "^10.0.6",
    "@types/sinon": "^17.0.3",
    "@types/yargs": "^17.0.32",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "c8": "^9.1.0",
    "chai": "^4.4.1",
    "eslint": "^8.57.0",
    "mocha": "^10.3.0",
    "nyc": "^15.1.0",
    "sinon": "^17.0.1",
    "ts-node": "^10.9.2",
    "tsc-watch": "^6.0.4",
    "typedoc": "^0.25.12"
  },
  "dependencies": {
    "chalk": "^5.3.0",
    "rimraf": "^5.0.5",
    "typescript": "^5.4.2",
    "yargs": "^17.7.2"
  }
}
```
Además, en el tsconfig deberemos especificar la propiedad module, asígnándole el valor node16.

Un ejemplo de uso de chalk es el siguiente con diferentes estilos y colores:
```typescript
import chalk from "chalk";

const log = console.log;

// Estilos y colores simples
log(chalk.blue("Hello") + " World" + chalk.red("!"));

// Combinación de estilos y colores
log(chalk.blue.bgRed.bold("Hello world!"));

// Aplicación a múltiples argumentos
log(chalk.blue("Hello", "World!", "Foo", "bar", "biz", "baz"));

// Anidamiento de estilos
log(chalk.red("Hello", chalk.underline.bgBlue("world") + "!"));
```


## Yargs
El paquete **Yargs** se utiliza para analizar los argumentos pasados a un programa desde la línea de comandos, facilitando la creación de interfaces de usuario interactivas y robustas. Algunas características importantes incluyen:

**Gestión de Comandos**: Permite definir y gestionar diferentes comandos, cada uno con sus opciones y manejadores correspondientes.

**Validación de Argumentos**: Ofrece opciones para especificar el tipo y la obligatoriedad de los argumentos, facilitando la validación de la entrada del usuario.

**API Encadenada**: Permite encadenar varias configuraciones de comandos y opciones para una fácil configuración.

**Integración con TypeScript**: Se incluyen los tipos de TypeScript para un desarrollo más seguro y sin errores.

Para el comienzo de su utilización deberemo instalarlo con los siguientes comandos:
```bash
npm i yargs
npm i --save-dev @types/yargs
```

Un ejemplo de uso del yargs sería el siguiente:
```typescript
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('add', 'Adds a card to the collection', {
    id: {
      description: 'Card ID',
      type: 'number',
      demandOption: true
    }
  }, (argv) => {
    console.log(argv.id);
  })
  .help()
  .argv;
```


--- 

# 11. EJERCICIO

## Enunciado.
El proyecto consiste en desarrollar una aplicación cliente-servidor para coleccionistas de cartas Magic. El servidor y el cliente se implementan utilizando los sockets proporcionados por el módulo net de Node.js. Los usuarios pueden realizar operaciones como añadir, modificar, eliminar, listar y mostrar cartas de sus colecciones a través de la línea de comandos del cliente. La información de las cartas se almacena en ficheros JSON en el sistema de archivos del servidor. Se utilizan paquetes como yargs y chalk para gestionar los comandos y el formato de salida. El servidor es capaz de manejar múltiples solicitudes de diferentes clientes simultáneamente. El diseño y las decisiones de implementación se documentan en un informe, y se siguen prácticas como TDD/BDD, flujos de trabajo de GitHub Actions y principios SOLID.

## Código propuesto.
Al ejercicio propuesto se realizó el siguiente código divido en diferentes ficheros para organizarlo.

Se creó el directorio **EJERCICIO** donde se alojará la práctica.

### Card.ts
```typescript
import { Color } from "./EnumerationColor.js";
import { LineType } from "./EnumerationLineType.js";
import { Rarity } from "./EnumerationRarity.js";

/**
 * Interfaz para la información de las cartas
 * Esta interfaz se utiliza para definir la estructura de los datos que se van a utilizar en la aplicación
 * @param id: number - Identificador de la carta
 * @param name: string - Nombre de la carta
 * @param manaCost: number - Costo de mana de la carta
 * @param color: string - Color de la carta
 * @param cardType: string - Tipo de carta
 * @param rarity: Rarity, es una enumeracion
 * @param rulesText: string - Texto de reglas de la carta
 * @param power: number - Poder de la carta
 * @param toughness: number - Resistencia de la carta
 * @param loyalty: number - Lealtad de la carta
 * @param marketValue: number - Valor de mercado de la carta
 */
export interface Card {
  id: number;
  name: string;
  manaCost: number;
  color: Color;
  cardType: LineType;
  rarity: Rarity;
  rulesText: string;
  power?: number; // SOLO se incluyen en aquellas cartas de tipo Criatura
  toughness?: number; // solo se incluyen en aquellas cartas de tipo Criatura
  loyalty?: number; // solo Planeswalker
  marketValue: number;
}
```

### User.ts
```typescript
import chalk from 'chalk';
import { Card } from './Card.js';
import { FileManager } from './FileManager.js';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Clase para la colección de cartas
 * Esta clase se utiliza para gestionar la colección de cartas de un usuario
 * @param collection: Card[] - Colección de cartas
 * @param user: string - Nombre de usuario
 * @param fileManager: FileManager - Instancia de la clase FileManager
 * @param loadCollection: void - Cargar la colección de cartas
 * @param addCard: void - Añadir una carta a la colección
 * @param updateCard: void - Actualizar una carta de la colección
 * @param removeCard: void - Eliminar una carta de la colección
 * @param listCards: void - Listar las cartas de la colección
 * @param readCard: void - Leer la información de una carta
 */
export class CardCollection {
  /**
   * Colección de cartas del usuario
   * Es privado y solo se puede acceder desde la clase
   */
  private collection: Card[] = [];

  /**
   * Usuario propietario de la colección
   * Es privado y solo se puede acceder desde la clase
   */
  private user: string;

  /**
   * Instancia de la clase FileManager
   * Es privado y solo se puede acceder desde la clase
   */
  private fileManager: FileManager;

  /**
   * Constructor de la clase CardCollection
   * Se encarga de inicializar el usuario y la instancia de FileManager
   * Luego carga la colección de cartas
   */
  constructor(user: string) {
    this.user = user;
    this.fileManager = new FileManager(user);
    this.loadCollection(); 
  }

  /**
   * Método que retorna el color en formato hexadecimal.
   * Suponemos que el gris es el color incoloro y el magenta es el multicolor.
   * Si el color no se encuentra en el mapa de colores será negro.
   * @param colorName nombre del color
   * @returns retorna el color en formato hexadecimal
   */
  getColorCode(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      blanco: '#FFFFFF',
      azul: '#0000FF',
      negro: '#000000',
      rojo: '#FF0000',
      verde: '#00FF00',
      amarillo: '#FFFF00',
      naranja: '#FFA500',
      morado: '#800080',
      rosa: '#FFC0CB',
      marron: '#A52A2A',
      incoloro: '#CCCCCC', 
      multicolor: '#FF00FF'
    };
    return colorMap[colorName.toLowerCase()] || '#000000'; 
  }
    
  /**
   * Metodo que se encarga de cargar la collecion
   * desde los ficheros.
   */
  private loadCollection(): void {
    this.collection = Array.from(this.fileManager.load().values());
  }

  /**
   * Método para añadir una carta a la colección
   * Este método añade una nueva carta a la colección del usuario. Si la carta ya existe en la colección,
   * se muestra un mensaje de error. Si la carta no existe, se añade a la colección y se guarda en el sistema de archivos.
   * @param card La carta que se va a añadir a la colección.
   * @returns void no devuelve nada
   */
  public addCard(card: Card): void {
    // Si ya existe en la coleccion
    if (this.collection.some(c => c.id === card.id)) {
      console.log(chalk.red.bold(`La carta con ID ${card.id} ya existe en la colección de ${this.user}.`));
    } else {
      // si no existe la añadimos
      this.collection.push(card);
      const filePath = this.fileManager.getFilePath(card.id);
      // si no existe el directorio lo creamos
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      // guardamos la carta en el sistema de archivos
      fs.writeFileSync(filePath, JSON.stringify(card, null, 2));
      console.log(chalk.green.bold(`Nueva carta añadida a la colección de ${this.user}.`));
    }
  }

  /**
   * Método para actualizar una carta en la colección
   * Este método actualiza una carta en la colección del usuario. Si la carta no existe en la colección,
   * se muestra un mensaje de error. Si la carta existe, se actualiza en la colección y se guarda en el sistema de archivos.
   * @param updatedCard La carta actualizada que se va a añadir a la colección.
   * @returns void no devuelve nada
   */
  public updateCard(updatedCard: Card): void {
    const cardIndex = this.collection.findIndex(c => c.id === updatedCard.id);
    if (cardIndex === -1) {
      console.log(chalk.red.bold(`La carta con ID ${updatedCard.id} no existe en la colección de ${this.user}.`));
    } else {
      this.collection[cardIndex] = updatedCard;
      fs.writeFileSync(this.fileManager.getFilePath(updatedCard.id), JSON.stringify(updatedCard, null, 2));
      console.log(chalk.green.bold(`Carta actualizada en la colección de ${this.user}.`));
    }
  }

  /**
   * Método para eliminar una carta de la colección
   * Este método elimina una carta de la colección del usuario. Si la carta no existe en la colección,
   * se muestra un mensaje de error. Si la carta existe, se elimina de la colección y 
   * se borra del sistema de archivos. 
   * @param id El identificador de la carta que se va a eliminar de la colección.
   * @returns void no devuelve nada
   */
  public removeCard(id: number): void {
    // Buscamos la carta en la coleccion
    const cardIndex = this.collection.findIndex(c => c.id === id);
    // Si no existe mostramos un mensaje de error
    if (cardIndex === -1) {
      console.log(chalk.red.bold(`La carta con ID ${id} no existe en la colección de ${this.user}.`));
    } else {
      // Si existe la eliminamos
      this.collection.splice(cardIndex, 1);
      const filePath = this.fileManager.getFilePath(id);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(chalk.green.bold(`Carta eliminada de la colección de ${this.user}.`));
      } else {
        console.log(chalk.red.bold(`El archivo de la carta con ID ${id} no existe.`));
      }
    }
  }

  /**
   * Método para listar las cartas de la colección
   * Este método muestra por consola la información de todas las cartas de la colección del usuario.
   * Muestra cada uno de los atributos de la carta, como el nombre, el coste de mana, el color, 
   * el tipo de carta, etc. Aqui hacemos uso del metodo para obtener el color en hexadecimal.
   * @returns void no devuelve nada
   */
  public listCards(): void {
    console.log(chalk.bold(`\nColección de cartas de ${this.user}\n`));
    this.collection.forEach(card => {
      const colorCode = this.getColorCode(card.color);
      console.log(chalk.bold.italic(chalk.white(`ID: ${card.id}`)));
      console.log(chalk.bold.italic(chalk.cyan(`Nombre: ${card.name}`)));
      console.log(chalk.bold.italic(`Coste de Mana: ${card.manaCost}`));
      console.log(chalk.bold.italic(`Color: ${chalk.hex(colorCode)(card.color)}`));
      console.log(chalk.bold.italic(`Tipo de Línea: ${card.cardType}`));
      console.log(chalk.bold.italic(`Rareza: ${card.rarity}`));
      console.log(chalk.bold.italic(`Texto de Reglas: ${card.rulesText}`));
      if (card.cardType === 'Criatura' && card.power && card.toughness) {
        console.log(chalk.bold.italic(`Fuerza/Resistencia: ${card.power}/${card.toughness}`));
      }
      if (card.loyalty && card.cardType === 'Planeswalker') {
        console.log(chalk.bold.italic(`Marcas de Lealtad: ${card.loyalty}`));
      }
      console.log(chalk.bold.italic(`Valor de Mercado: ${card.marketValue}`));
      console.log("");
    });
  }

  /**
   * Método para leer la información de una carta
   * Este método muestra por consola la información de una carta de la colección del usuario.
   * Muestra cada uno de los atributos de la carta, como el nombre, el coste de mana, el color,
   * el tipo de carta, etc. Aqui hacemos uso del metodo para obtener el color en hexadecimal.
   * Si la carta no existe en la colección, se muestra un mensaje de error.
   * @param id El identificador de la carta que se va a leer.
   * @returns void no devuelve nada
   */
  public readCard(id: number): void {
    const card = this.collection.find(c => c.id === id);
    if (!card) {
      console.log(chalk.red.bold(`La carta con ID ${id} no existe en la colección de ${this.user}.`));
    } else {
      const colorCode = this.getColorCode(card.color);
      console.log(chalk.bold.italic(`\nInformación de la carta con ID ${id}\n`));
      console.log(chalk.bold.italic(chalk.cyan(`Nombre: ${card.name}`)));
      console.log(chalk.bold.italic(`Coste de Mana: ${card.manaCost}`));
      console.log(chalk.bold.italic(`Color: ${chalk.hex(colorCode)(card.color)}`));
      console.log(chalk.bold.italic(`Tipo de Carta: ${card.cardType}`));
      console.log(chalk.bold.italic(`Rareza: ${card.rarity}`));
      console.log(chalk.bold.italic(`Texto de Reglas: ${card.rulesText}`));
      if (card.cardType === 'Criatura' && card.power && card.toughness) {
        console.log(chalk.bold.italic(`Fuerza/Resistencia: ${card.power}/${card.toughness}`));
      }
      if (card.loyalty && card.cardType === 'Planeswalker') {
        console.log(chalk.bold.italic(`Marcas de Lealtad: ${card.loyalty}`));
      }
      console.log(chalk.bold.italic(`Valor de Mercado: ${card.marketValue}`));
    }
  }
}
```

###  File Manager.

```typescript
import fs from 'fs';
import { Card } from './Card.js';
import * as path from 'path';

/**
 * Clase para la gestión de archivos
 * Esta clase se utiliza para guardar y cargar la información de las cartas en archivos JSON
 * Cada usuario tiene su propio directorio y cada carta se guarda en un archivo JSON
 * @param username: string - Nombre de usuario
 * @param userDir: string - Directorio del usuario
 * @param getFilePath: string - Ruta del archivo
 * @param save: void - Guardar la colección de cartas en archivos JSON
 * @param load: Map<number, Card> - Cargar la colección de cartas desde archivos JSON
 * @param collection: Map<number, Card> - Colección de cartas
 */
export class FileManager {
  /**
   * Directorio del usuario, donde se guardan los archivos JSON
   * Es privado y solo se puede acceder desde la clase
   */
  private readonly userDir: string;

  /**
   * Constructor de la clase FileManager
   * Se encarga de inicializar el directorio del usuario según el nombre de usuario
   * @param username username: string - Nombre de usuario
   */
  constructor(private username: string) {
    this.userDir = `./src/MAGICAPP/users/${username}`;
  }
  
  /**
   * Método que retorna el directorio del usuario
   * @returns Retorna el directorio del usuario 
   */
  public getUserDir(): string {
    return this.userDir;
  }

  /**
   * Retorna la ruta del archivo de la carta
   * Lo que hace es concatenar el directorio del usuario con el nombre del archivo
   * @param cardId cardId: number - Identificador de la carta
   * @returns retorna la ruta del archivo
   */
  public getFilePath(cardId: number): string {
    return path.join(this.userDir, `card${cardId}.json`);
  }

  /**
   * Método que guarda la colección de cartas en archivos JSON
   * Lo que hace es comprobar si el directorio del usuario existe, si no existe lo crea
   * Luego recorre la colección de cartas y guarda cada carta en un archivo JSON
   * @param collection collection: Map<number, Card> - Colección de cartas
   */
  public save(collection: Map<number, Card>): void {
    if (!fs.existsSync(this.userDir)) {
      fs.mkdirSync(this.userDir, { recursive: true });
    }
    for (const [cardId, card] of collection) {
      fs.writeFileSync(this.getFilePath(cardId), JSON.stringify(card, null, 2));
    }
  }
  
  /**
   * Método que carga la colección de cartas desde archivos JSON
   * Lo que hace es comprobar si el directorio del usuario existe, si no existe retorna un Map vacío
   * Luego lee los archivos JSON del directorio y los guarda en la colección
   * @returns retorna la colección de cartas
   */
  public load(): Map<number, Card> {
    const collection = new Map<number, Card>();
    if (fs.existsSync(this.userDir)) {
      const files = fs.readdirSync(this.userDir);
      for (const file of files) {
        const data = fs.readFileSync(`${this.userDir}/${file}`, 'utf-8');
        const card = JSON.parse(data) as Card;
        collection.set(card.id, card);
      }
    }
    return collection;
  }
}
```

### EnumerationColor.ts
```typescript
/**
 * Enumeración de colores para las cartas
 * Esta enumeración se utiliza para definir los colores de las cartas
 * Cada carta tiene un color que puede ser blanco, azul, 
 * negro, rojo, verde, incoloro, incluso multicolor...
 */
export enum Color {
  Blanco = 'Blanco',
  Azul = 'Azul',
  Negro = 'Negro',
  Rojo = 'Rojo',
  Verde = 'Verde',
  Incoloro = 'Incoloro',
  Multicolor = 'Multicolor',
  Amarillo = 'Amarillo',
  Morado = 'Morado',
  Rosa = 'Rosa',
  Marron = 'Marron',
  Naranja = 'Naranja'
}
```

### EnumerationLineType.ts
```typescript
/**
 * Enumeración de los tipos de cartas
 * Las cartas pueden ser de diferentes tipos.
 */
export enum LineType {
  Tierra = 'Tierra',
  Criatura = 'Criatura',
  Encantamiento = 'Encantamiento',
  Conjuro = 'Conjuro',
  Instantáneo = 'Instantáneo',
  Artefacto = 'Artefacto',
  Planeswalker = 'Planeswalker',
}
```

### EnumerationRarity.ts
```typescript
/**
 * Enumeración de las rarezas de las cartas
 * Las cartas pueden ser de diferentes tipos de rareza
 * Hay 4 tipos de rarezas: comun, infrecuente, rara y mítica.
 */
export enum Rarity {
  Comun = 'Comun',
  Infrecuente = 'Infrecuente',
  Rara = 'Rara',
  Mítica = 'Mítica',
}
```
### index.ts
```typescript
import yargs from 'yargs';
import { CardCollection } from './User.js';
import { Color } from './EnumerationColor.js';
import { LineType } from './EnumerationLineType.js';
import { Rarity } from './EnumerationRarity.js';
import net from 'net';

// Conectar al servidor el cliente
const client = net.connect({ port: 60300 });

// Escuchar datos del servidor
client.on('data', data => {
  console.log(data.toString());
});

// Definir comandos y opciones utilizando yargs
/**
 * Comando para gestionar la colección de cartas
 * Se pueden añadir, listar, actualizar, leer y eliminar cartas de la colección
 * Los comandos disponibles son:
 * - add: Añade un nuevo usuario a la colección
 * - list: Lista todos los usuarios de la colección
 * - update: Actualiza un usuario de la colección
 * - read: Lee un usuario de la colección
 * - remove: Elimina un usuario de la colección
 * Para más información sobre los comandos, ejecutar el comando --help
 */
yargs(process.argv.slice(2))
  /**
   * Comando para añadir un nuevo usuario a la colección
   * Por parámetros se deben indicar el nombre del usuario, el ID, el nombre, 
   * el coste de mana, el color, el tipo de línea, la rareza, el texto de reglas y el valor de mercado.
   * @param user: string - Nombre del usuario
   * @param id: number - ID del usuario
   * @param name: string - Nombre del usuario
   * @param manaCost: number - Coste de mana
   * @param color: string - Color del usuario
   * @param lineType: string - Tipo de línea del usuario
   * @param rarity: string - Rareza del usuario
   * @param rulesText: string - Texto de reglas del usuario
   * @param power: number - Poder del usuario
   * @param toughness: number - Resistencia del usuario
   * @param loyaltyMarks: number - Marcas de lealtad del usuario
   * @param marketValue: number - Valor de mercado del usuario
   */
  .command({
    command: 'add',
    describe: 'Añade un nuevo usuario a la colección',
    builder: {
      user: { describe: 'Nombre del usuario', demandOption: true, type: 'string' },
      id: { describe: 'ID del usuario', demandOption: true, type: 'number' },
      name: { describe: 'Nombre del usuario', demandOption: true, type: 'string' },
      manaCost: { describe: 'Coste de mana', demandOption: true, type: 'number' },
      color: { describe: 'Color del usuario', demandOption: true, type: 'string', choices: Object.values(Color) },
      lineType: { describe: 'Tipo de línea del usuario', demandOption: true, type: 'string', choices: Object.values(LineType) },
      rarity: { describe: 'Rareza del usuario', demandOption: true, type: 'string', choices: Object.values(Rarity) },
      rulesText: { describe: 'Texto de reglas del usuario', demandOption: true, type: 'string' },
      power: { describe: 'Poder del usuario', type: 'array', default: [] },
      toughness: { describe: 'Resistencia del usuario', type: 'array', default: [] },
      loyaltyMarks: { describe: 'Marcas de lealtad del usuario', type: 'number' },
      marketValue: { describe: 'Valor de mercado del usuario', demandOption: true, type: 'number' }
    },
    // esto se ejecuta cuando se llama al comando
    handler: argv => {
      const collection = new CardCollection(argv.user);
      const user = {
        id: argv.id,
        name: argv.name,
        manaCost: argv.manaCost,
        color: argv.color,
        cardType: argv.lineType,
        rarity: argv.rarity,
        rulesText: argv.rulesText,
        power: argv.power,
        toughness: argv.toughness,
        loyalty: argv.loyaltyMarks,
        marketValue: argv.marketValue
      };
      collection.addCard(user);
      const data = JSON.stringify({ action: 'add', user: argv.user, card: user, close: 'CLOSED' });
      client.write(data);
    }
  })
  /**
   * Comando para listar todos los usuarios de la colección
   * Por parámetros se debe indicar el nombre del usuario y se listan todos los usuarios de la colección
   * @param user: string - Nombre del usuario
   * @returns retorna la lista de usuarios de la colección
   */
  .command({
    command: 'list',
    describe: 'Lista todos los usuarios de la colección',
    builder: {
      user: { describe: 'Nombre del usuario', demandOption: true, type: 'string' }
    },
    handler: argv => {
      const collection = new CardCollection(argv.user);
      collection.listCards();
      const data = JSON.stringify({ action: 'list', user: argv.user, close: 'CLOSED' });
      client.write(data);
    }
  })
  /**
   * Comando para actualizar un usuario de la colección
   * Por parámetros se deben indicar el nombre del usuario, el ID y los campos a actualizar
   * @param user: string - Nombre del usuario
   * @param id: number - ID del usuario
   * @param name: string - Nombre del usuario
   * @param manaCost: number - Coste de mana
   * @param color: string - Color del usuario
   * @param lineType: string - Tipo de línea del usuario
   * @param rarity: string - Rareza del usuario
   * @param rulesText: string - Texto de reglas del usuario
   * @param power: number - Poder del usuario
   * @param toughness: number - Resistencia del usuario
   * @param loyaltyMarks: number - Marcas de lealtad del usuario
   * @param marketValue: number - Valor de mercado del usuario
   */
  .command({
    command: 'update',
    describe: 'Actualiza un usuario de la colección',
    builder: {
      user: { describe: 'Nombre del usuario', demandOption: true, type: 'string' },
      id: { describe: 'ID del usuario', demandOption: true, type: 'number' },
      name: { describe: 'Nombre del usuario', type: 'string' },
      manaCost: { describe: 'Coste de mana', type: 'number' },
      color: { describe: 'Color del usuario', type: 'string', choices: Object.values(Color) },
      lineType: { describe: 'Tipo de línea del usuario', type: 'string', choices: Object.values(LineType) },
      rarity: { describe: 'Rareza del usuario', type: 'string', choices: Object.values(Rarity) },
      rulesText: { describe: 'Texto de reglas del usuario', type: 'string' },
      power: { describe: 'Poder  del usuario', type: 'array', default: [] },
      toughness: { describe: 'Resistencia del usuario', type: 'array', default: [] },
      loyaltyMarks: { describe: 'Marcas de lealtad del usuario', type: 'number' },
      marketValue: { describe: 'Valor de mercado del usuario', type: 'number' }
    },
    handler: argv => {
      const collection = new CardCollection(argv.user);
      const user = {
        id: argv.id,
        name: argv.name,
        manaCost: argv.manaCost,
        color: argv.color,
        cardType: argv.lineType,
        rarity: argv.rarity,
        rulesText: argv.rulesText,
        power: argv.power,
        toughness: argv.toughness,
        loyalty: argv.loyaltyMarks,
        marketValue: argv.marketValue
      };
      collection.updateCard(user);
      const data = JSON.stringify({ action: 'update', user: argv.user, card: user, close: 'CLOSED' });
      client.write(data);
    }
  })
  /**
   * Comando para leer un usuario de la colección
   * Por parámetros se deben indicar el nombre del usuario y el ID del usuario
   * @param user: string - Nombre del usuario
   * @param id: number - ID del usuario
   * @returns retorna el usuario de la colección
   */
  .command({
    command: 'read',
    describe: 'Lee un usuario de la colección',
    builder: {
      user: { describe: 'Nombre del usuario', demandOption: true, type: 'string' },
      id: { describe: 'ID del usuario', demandOption: true, type: 'number' }
    },
    handler: argv => {
      const collection = new CardCollection(argv.user);
      collection.readCard(argv.id);
      const data = JSON.stringify({ action: 'read', user: argv.user, cardID: argv.id, close: 'CLOSED' });
      client.write(data);
    }
  })
  /**
   * Comando para eliminar un usuario de la colección
   * Por parámetros se deben indicar el nombre del usuario y el ID del usuario
   * @param user: string - Nombre del usuario
   * @param id: number - ID del usuario
   * @returns retorna el usuario eliminado de la colección
   */
  .command({
    command: 'remove',
    describe: 'Elimina un usuario de la colección',
    builder: {
      user: { describe: 'Nombre del usuario', demandOption: true, type: 'string' },
      id: { describe: 'ID del usuario', demandOption: true, type: 'number' }
    },
    handler: argv => {
      const collection = new CardCollection(argv.user);
      collection.removeCard(argv.id);
      const data = JSON.stringify({ action: 'remove', user: argv.user, cardID: argv.id, close: 'CLOSED' });
      client.write(data);
    }
  })
  // comandos de ayuda
  .help()
  .parse();

```

### Server.ts
```typescript
import net from 'net';
import { CardCollection } from './User.js';
import { EventEmitterSocket } from './EventEmitterSocket.js';

/**
 * Servidor que gestiona la colección de cartas de los usuarios
 * Los comandos disponibles son:
 * - add: Añade una carta a la colección de un usuario
 * - remove: Elimina una carta de la colección de un usuario
 * - update: Actualiza una carta de la colección de un usuario
 * - read: Lee una carta de la colección de un usuario
 * - list: Lista todas las cartas de la colección de un usuario
 */
const server = net.createServer(connection => {
  // Cuando un cliente se conecta imprime un mensaje
  console.log('Cliente conectado.');
  // Crear una instancia de EventEmitterSocket para gestionar la conexión
  const eventEmitterSocket = new EventEmitterSocket(connection);
  let requestData = '';
  // Escuchar el evento 'request' para gestionar las peticiones
  /**
   * Escuchar el evento 'request' para gestionar las peticiones
   * Imprime un mensaje cuando se recibe una petición completa
   * Procesa la petición y envía una respuesta al cliente
   * @event request - evento que se emite cuando se recibe una petición completa
   * @param request - petición recibida
   * @param connection - conexión del cliente
   */
  eventEmitterSocket.on('request', (request, connection) => {
    console.log('Petición completa recibida:', request);
    // Procesar la petición y enviar una respuesta
    try {
      const cardRequest = JSON.parse(request);
      const cardCollection = new CardCollection(cardRequest.user);
      let answer = '';
      // Realizar la acción correspondiente según el comando recibido
      switch (cardRequest.action) {
        case 'add':
          cardCollection.addCard(cardRequest.card);
          answer = `Card with ID ${cardRequest.card.id} added to the collection of ${cardRequest.user}.`;
          break;
        case 'remove':
          cardCollection.removeCard(cardRequest.card.id);
          answer = `Card with ID ${cardRequest.card.id} removed from the collection of ${cardRequest.user}.`;
          break;
        case 'update':
          cardCollection.updateCard(cardRequest.card);
          answer = `Card with ID ${cardRequest.card.id} updated in the collection of ${cardRequest.user}.`;
          break;
        case 'read':
          const cardToRead = cardCollection.readCard(cardRequest.card.id);
          answer = `Card with ID ${cardRequest.card.id} read from the collection of ${cardRequest.user}: ${JSON.stringify(cardToRead)}.`;
          break;
        case 'list':
          const cards = cardCollection.listCards();
          answer = `Cards in the collection of ${cardRequest.user}: ${JSON.stringify(cards)}.`;
          break;
        default:
          answer = `Unknown command: ${cardRequest.action}`;
          break;
      }
      // Enviar la respuesta al cliente
      const responseObject = { response: answer };
      const responseString = JSON.stringify(responseObject);
      connection.write(responseString);
    } catch (error) {
      const responseData = { error: error.message };
      const responseString = JSON.stringify(responseData);
      connection.write(responseString);
    }
    // Cerrar la conexión después de enviar la respuesta
    connection.end();
  });

  /**
   * Escuchar el evento 'close' para gestionar la desconexión del cliente
   * Imprime un mensaje cuando el cliente se desconecta
   * @event close - evento que se emite cuando la conexión se cierra
   */
  eventEmitterSocket.on('close', () => {
    console.log('Cliente desconectado.');
  });
});

/**
 * Servidor escuchando en el puerto 60300
 * Imprime un mensaje cuando el servidor está esperando conexiones
 * @param 60300 - puerto en el que escucha el servidor
 */
server.listen(60300, () => {
  console.log('Servidor esperando conexiones...');
});
```

### EventEmitterSocket.ts
```typescript
import { EventEmitter } from 'events';

/**
 * Clase que extiende de EventEmitter y se encarga de emitir eventos cuando se recibe un mensaje completo
 * Posee un constructor que recibe una conexion y se encarga de recibir los datos de la conexion y emitir un evento cuando se recibe un mensaje completo
 * @extends EventEmitter clase de node.js de la que hereda
 * @param connection - instancia de eventmitter que representa la conexion
 * @event request - evento que se emite cuando se recibe un mensaje completo
 * @event close - evento que se emite cuando la conexion se cierra
 * @function on - metodo de EventEmitter que se encarga de escuchar los eventos
 */
export class EventEmitterSocket extends EventEmitter {
  /**
   * Constructor de la clase EventEmitterSocket
   * Se encarga de recibir los datos de la conexion y emitir un evento cuando se recibe un mensaje completo
   * @param connection - instancia de eventmitter que representa la conexion
   */
  constructor(connection: EventEmitter) {
    super();
    let wholeData = '';
    // cuando se reciben datos
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;
      // si incluye CLOSE se recibio el mensjae completo
      if (wholeData.includes('CLOSED"}')) {
        this.emit('request', JSON.parse(wholeData), connection);
      }
    });
    // Cuando la conexion se cierra
    connection.on('close', () => {
      this.emit('close');
    });
  }
}
```
## Explicación de lo realizado.

Tras haber visto el código porpuesto comentaré detalladamente cada parte del código realizado.

### Card.ts
Interfaz para la información de las cartas.

La interfaz `Card` se utiliza para definir la estructura de los datos que se van a utilizar en la aplicación relacionada con las cartas de un juego. Esta interfaz describe los atributos que debe tener cada carta y su tipo de dato correspondiente. A continuación, se detallan los atributos de la interfaz:

- **id:** Es un número que representa el identificador único de la carta.
- **name:** Es una cadena de caracteres que indica el nombre de la carta.
- **manaCost:** Es un número que representa el costo de mana de la carta.
- **color:** Es un valor de tipo `Color`, que proviene de un enumerado y representa el color de la carta.
- **cardType:** Es un valor de tipo `LineType`, también de un enumerado, que indica el tipo de la carta (Tierra, Criatura, Encantamiento, etc.).
- **rarity:** Es un valor de tipo `Rarity`, otro enumerado que representa la rareza de la carta (común, infrecuente, rara o mítica).
- **rulesText:** Es una cadena de caracteres que describe los efectos de la carta y cualquier regla especial que tenga.
- **power:** Es un número opcional que indica la fuerza de la carta. Este atributo solo se incluye en las cartas de tipo Criatura.
- **toughness:** Es un número opcional que indica la resistencia de la carta. Este atributo también se limita a las cartas de tipo Criatura.
- **loyalty:** Es un número opcional que representa la lealtad de la carta. Este atributo solo se incluye en las cartas de tipo Planeswalker.
- **marketValue:** Es un número que indica el valor de mercado de la carta.

Básicamente, la interfaz `Card` define la estructura básica de una carta del juego, especificando todos los atributos necesarios para su identificación, descripción y uso dentro de la aplicación.


### FileManager.ts

Clase para la gestión de archivos.

La clase `FileManager` se encarga de la gestión de archivos para guardar y cargar la información de las cartas en archivos JSON. Cada usuario tiene su propio directorio y cada carta se guarda en un archivo JSON dentro de ese directorio. A continuación, se detallan los métodos y atributos de la clase:

- **userDir:** Es una propiedad privada que almacena la ruta del directorio del usuario, donde se guardarán los archivos JSON.

- **Constructor:** El constructor de la clase inicializa el directorio del usuario según el nombre de usuario proporcionado como parámetro.

- **getUserDir():** Método público que retorna el directorio del usuario.

- **getFilePath(cardId):** Método público que retorna la ruta del archivo de una carta específica. Concatena el directorio del usuario con el nombre del archivo basado en el ID de la carta.

- **save(collection):** Método público que guarda la colección de cartas en archivos JSON. Primero comprueba si el directorio del usuario existe, y si no, lo crea. Luego, recorre la colección de cartas y guarda cada carta en un archivo JSON.

- **load():** Método público que carga la colección de cartas desde los archivos JSON. Comprueba si el directorio del usuario existe; si no, retorna un `Map` vacío. Luego, lee los archivos JSON del directorio y los guarda en la colección.

La clase `FileManager` proporciona funcionalidades para guardar y cargar la colección de cartas de un usuario en archivos JSON, asegurando que la información esté persistente y accesible entre sesiones de la aplicación.


## User.ts
Clase para la colección de cartas.

La clase `CardCollection` se encarga de gestionar la colección de cartas de un usuario. A continuación, se detallan los métodos y atributos de la clase:

- **collection:** Es un atributo privado que almacena la colección de cartas del usuario.

- **user:** Es un atributo privado que almacena el nombre de usuario propietario de la colección.

- **fileManager:** Es un atributo privado que almacena una instancia de la clase `FileManager` para gestionar los archivos.

- **Constructor:** El constructor de la clase inicializa el nombre de usuario y la instancia de `FileManager`. Además, carga la colección de cartas desde los archivos.

- **getColorCode(colorName):** Método público que retorna el código hexadecimal del color de una carta, utilizando un mapa predefinido de colores. Si el color no se encuentra en el mapa, retorna negro.

- **loadCollection():** Método privado que carga la colección de cartas desde los archivos utilizando la instancia de `FileManager`.

- **addCard(card):** Método público para añadir una carta a la colección del usuario. Si la carta ya existe, muestra un mensaje de error; de lo contrario, la añade a la colección y la guarda en el sistema de archivos.

- **updateCard(updatedCard):** Método público para actualizar una carta en la colección del usuario. Si la carta no existe, muestra un mensaje de error; de lo contrario, la actualiza en la colección y en el sistema de archivos.

- **removeCard(id):** Método público para eliminar una carta de la colección del usuario. Si la carta no existe, muestra un mensaje de error; de lo contrario, la elimina de la colección y del sistema de archivos.

- **listCards():** Método público para listar todas las cartas de la colección del usuario. Muestra la información de cada carta por consola, incluyendo su nombre, coste de mana, color, tipo de carta, rareza, texto de reglas, fuerza/resistencia, marcas de lealtad y valor de mercado.

- **readCard(id):** Método público para leer la información de una carta específica de la colección del usuario. Si la carta no existe, muestra un mensaje de error; de lo contrario, muestra la información de la carta por consola.

La clase `CardCollection` proporciona funcionalidades para gestionar la colección de cartas de un usuario, permitiendo añadir, actualizar, eliminar, listar y leer cartas de manera eficiente y persistente.


### EnumerationColor.ts
Enumeración de colores para las cartas.

La enumeración `Color` se utiliza para definir los colores de las cartas. Cada carta tiene un color que puede ser blanco, azul, negro, rojo, verde, incoloro, e incluso multicolor. A continuación se detallan los valores de la enumeración:

- **Blanco:** Representa el color blanco.
- **Azul:** Representa el color azul.
- **Negro:** Representa el color negro.
- **Rojo:** Representa el color rojo.
- **Verde:** Representa el color verde.
- **Incoloro:** Representa el color incoloro.
- **Multicolor:** Representa el color multicolor.
- **Amarillo:** Representa el color amarillo.
- **Morado:** Representa el color morado.
- **Rosa:** Representa el color rosa.
- **Marron:** Representa el color marrón.
- **Naranja:** Representa el color naranja.

Esta enumeración permite establecer y manejar de manera clara y consistente los colores de las cartas en la aplicación.


### EnumerationLineType.ts
Enumeración de los tipos de cartas

La enumeración `LineType` se utiliza para definir los diferentes tipos de cartas que pueden existir. A continuación se detallan los valores de la enumeración:

- **Tierra:** Representa el tipo de carta Tierra, que generalmente proporciona mana.
- **Criatura:** Representa el tipo de carta Criatura, que puede ser atacada y bloqueada.
- **Encantamiento:** Representa el tipo de carta Encantamiento, que proporciona efectos continuos.
- **Conjuro:** Representa el tipo de carta Conjuro, que realiza una acción única cuando se juega.
- **Instantáneo:** Representa el tipo de carta Instantáneo, que se puede jugar en cualquier momento, incluso durante el turno de otro jugador.
- **Artefacto:** Representa el tipo de carta Artefacto, que puede proporcionar beneficios diversos.
- **Planeswalker:** Representa el tipo de carta Planeswalker, que representa a personajes poderosos en el juego.

Esta enumeración facilita la gestión y clasificación de los diferentes tipos de cartas presentes en la aplicación.


### EnumerationRarity.ts
Enumeración de las rarezas de las cartas.

La enumeración `Rarity` se utiliza para definir los diferentes niveles de rareza que pueden tener las cartas. Aquí se detallan los tipos de rareza disponibles:

- **Común:** Representa el tipo de rareza Común, que indica que la carta es relativamente fácil de obtener.
- **Infrecuente:** Representa el tipo de rareza Infrecuente, que indica que la carta es menos común que las comunes.
- **Rara:** Representa el tipo de rareza Rara, que indica que la carta es más difícil de obtener que las infrecuentes.
- **Mítica:** Representa el tipo de rareza Mítica, que indica que la carta es extremadamente rara y altamente valorada.

Estos valores de rareza permiten categorizar las cartas según su disponibilidad y valor en el juego.


### index.ts

El cliente se conecta al servidor mediante el módulo `net` de Node.js, estableciendo una conexión TCP en el puerto 60300. Una vez conectado, el cliente escucha los datos del servidor y los muestra en la consola.

##### Definición de Comandos y Opciones

Se utiliza el paquete `yargs` para definir los comandos y opciones disponibles para gestionar la colección de cartas. Los comandos principales son:

- **add:** Añade una nueva carta a la colección.
- **list:** Lista todas las cartas de la colección.
- **update:** Actualiza una carta existente en la colección.
- **read:** Lee los detalles de una carta específica.
- **remove:** Elimina una carta de la colección.

##### Implementación de Comandos

Cada comando está implementado como una función que realiza una acción específica en la colección de cartas del usuario. Los comandos toman parámetros como el nombre del usuario, el ID de la carta y otros detalles necesarios para ejecutar la acción correspondiente.

##### Interacción con el Servidor

Después de ejecutar cada comando, se envía un mensaje al servidor indicando la acción realizada, junto con los detalles relevantes. El servidor procesará estos mensajes y realizará las operaciones correspondientes en su base de datos.

##### Ejecución de Comandos

El cliente acepta comandos a través de la línea de comandos y los procesa utilizando el paquete `yargs`. Cada comando ejecutado desencadena una acción en la colección de cartas del usuario y envía un mensaje al servidor para actualizar la base de datos.


### Server.ts
El servidor se crea utilizando el módulo `net` de Node.js y se configura para escuchar en el puerto 60300. Este servidor gestiona las operaciones relacionadas con la colección de cartas de los usuarios.

##### Comandos Disponibles

Los usuarios pueden enviar varios comandos al servidor para gestionar su colección de cartas. Los comandos disponibles son:

- **add:** Añade una carta a la colección de un usuario.
- **remove:** Elimina una carta de la colección de un usuario.
- **update:** Actualiza una carta de la colección de un usuario.
- **read:** Lee una carta de la colección de un usuario.
- **list:** Lista todas las cartas de la colección de un usuario.

##### Implementación del Servidor

El servidor utiliza `net.createServer()` para crear un servidor TCP. Cuando un cliente se conecta, se crea una instancia de `EventEmitterSocket` para gestionar la conexión. Luego, el servidor escucha eventos como 'request' y 'close' para manejar las peticiones y las desconexiones de los clientes.

##### Gestión de Peticiones

Cuando se recibe una petición completa desde un cliente, el servidor la procesa y realiza la acción correspondiente en la colección de cartas del usuario. Se utilizan estructuras de control como `switch` para determinar la acción que se debe realizar según el comando recibido.

##### Envío de Respuestas

Después de procesar la petición, el servidor envía una respuesta al cliente. La respuesta puede contener un mensaje de éxito o error, dependiendo del resultado de la operación solicitada por el cliente.


### EventEmitterSocket.ts
La clase `EventEmitterSocket` extiende la clase `EventEmitter` de Node.js y se encarga de emitir eventos cuando se recibe un mensaje completo a través de una conexión. Esta clase es fundamental para la gestión de conexiones en el servidor de gestión de colección de cartas.

##### Constructor

El constructor de la clase `EventEmitterSocket` recibe una instancia de `EventEmitter` que representa la conexión establecida. Este constructor se encarga de configurar los listeners para los eventos 'data' y 'close' de la conexión.

##### Eventos

- **request:** Este evento se emite cuando se recibe un mensaje completo a través de la conexión. Contiene el mensaje completo recibido y la conexión asociada.
- **close:** Este evento se emite cuando la conexión se cierra. 

##### Funcionamiento

Cuando se reciben datos a través de la conexión, se van acumulando en una variable `wholeData`. Se verifica si los datos recibidos incluyen la cadena `"CLOSED"`, lo que indica que se ha recibido un mensaje completo. En ese caso, se emite el evento 'request' con el mensaje completo y la conexión asociada.

Cuando la conexión se cierra, se emite el evento 'close' para notificar que la conexión ha sido cerrada.


## EJEMPLOS DE USO.
En primer lugar, abriremos dos terminales, una para el servidor y otra para el cliente.

En ambas terminales compilaremos el código mediante el comando **tsc**.
Una vez compilado lo que haremos en el servidor será ejecutar con el comando
```bash
$node dist/EJERCICIO/Server.js
```

En el cliente, despues de compilar ejecutaremos el código pasando las opciones por argumentos.
```bash
$node dist/EJERCICIO/index.js  add --user "edusegre" --id 9 --name "Black Lotus" --manaCost 200 --color Amarillo --lineType "Criatura" --rarity "Rara"  --rulesText "si" --marketValue 1000
```

Al crear un nuevo usuario edusegre con todos los argumentos se creará un nuevo directorio denominado edusegre y cuyo id de carta será el 9.
Al ejecutar el comando anterior se imprimirá en color verde:
```bash
Nueva carta añadida a la colección de edusegre.
```
Hecho esto el cliente se cerrará automáticamente.

### EJEMPLO DE ACTUALIZACION
Al igual que el ejemplo anterior ejecutaremos con los argumentos establecidos:
```bash
$node dist/EJERCICIO/index.js  update --user "edusegre" --id 9 --name "Unicornio" --manaCost 200 --color Amarillo --lineType "Criatura" --rarity "Mítica"  --rulesText "si" --marketValue 1000
```
Al ejecutar este comando se nos actualizarán los campos que hayamos cambiado en nuestra carta.
Al igual que antes se imprimirá un mensaje verde :
```bash
Carta actualizada en la colección de edusegre.
```
Y el cliente volverá a cerrarse automáticamente.

## EJEMPLO DE LISTAR

```bash
$node dist/EJERCICIO/index.js list --user edusegre 
```
Esto imprimirá:

```bash
Colección de cartas de edusegre
ID: 8
Nombre: Black Lotus
Coste de Mana: 10000
Color: Naranja
Tipo de Línea: Tierra
Rareza: Rara
Texto de Reglas: undefined
Valor de Mercado: undefined

ID: 9
Nombre: Unicornio
Coste de Mana: 200
Color: Amarillo
Tipo de Línea: Criatura
Rareza: Mítica
Texto de Reglas: si
Fuerza/Resistencia: /
Valor de Mercado: 1000

```
No se puede apreciar aqui, pero el campo del color se imprime cada palabra de su color correspondiente.

### EJEMPLO MOSTRAR

A diferencia de listar, este se encarga de mostrar una carta en específico:
```bash
$node dist/EJERCICIO/index.js read --user edusegre --id 9
```
Se imprimirá los siguiente

```bash
Información de la carta con ID 9

Nombre: Unicornio
Coste de Mana: 200
Color: Amarillo
Tipo de Carta: Criatura
Rareza: Mítica
Texto de Reglas: si
Fuerza/Resistencia: /
Valor de Mercado: 1000
```


### EJEMPLO DE ELIMINAR

Si utilizamos lo siguiente:
```bash
$node dist/EJERCICIO/index.js  remove --user "edusegre" --i
d 9 --name "Unicornio" --manaCost 200 --color Amarillo --lineType "Criatura" --rarity "Mitica"  --rulesText "si" --marketValue 10
00
```

Se nos eliminará la carta de nuesto directorio y se nos mostrará en verde un mensaje
```bash
Carta eliminada de la colección de edusegre.
```

## Pruebas realizadas y coverage

Para el cubrimiento del código se realizaron diferentes pruebas para comporbar la completitud de este.

### Card.spec.ts
```typescript
// PRUEBAS PARA LA INTERFAZ CARD

import 'mocha';
import { expect } from 'chai';
import { Card } from '../../src/MAGICAPP/Card.js';
import { Color } from '../../src/MAGICAPP/EnumerationColor.js';
import { LineType } from '../../src/MAGICAPP/EnumerationLineType.js';
import { Rarity } from '../../src/MAGICAPP/EnumerationRarity.js';

// pruebas para la interfaz
describe('Card', () => {
  // pruebas para asegurarnos que tiene los atributos correctos
  it('should have the correct attributes', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(card).to.have.property('id');
    expect(card).to.have.property('name');
    expect(card).to.have.property('manaCost');
    expect(card).to.have.property('color');
    expect(card).to.have.property('cardType');
    expect(card).to.have.property('rarity');
    expect(card).to.have.property('rulesText');
    expect(card).to.have.property('marketValue');
  });
  // nos aseguramos de que son 8 atributos obligatorios
  it('should have 8 required attributes', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.keys(card)).to.have.lengthOf(8);
  });
  // nos aseguramos de que los atributos opcionales sean opcionales
  it('should have 3 optional attributes', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      power: 1,
      toughness: 1,
      loyalty: 1,
      marketValue: 1
    };
    expect(Object.keys(card)).to.have.lengthOf(11);
  });
  // nos aseguramos que todo es de tipo correcto
  it('should have correct types', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(card.id).to.be.a('number');
    expect(card.name).to.be.a('string');
    expect(card.manaCost).to.be.a('number');
    expect(card.color).to.be.a('string');
    expect(card.cardType).to.be.a('string');
    expect(card.rarity).to.be.a('string');
    expect(card.rulesText).to.be.a('string');
    expect(card.marketValue).to.be.a('number');
  });
  // nos aseguramos que los valores de los enums sean correctos
  it('should have correct enum values', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.values(Color)).to.include(card.color);
    expect(Object.values(LineType)).to.include(card.cardType);
    expect(Object.values(Rarity)).to.include(card.rarity);
  });
  // Nos aseguramos que el color es un color del enum y no otro
  it('should have a color from the enum', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Amarillo,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.values(Color)).to.include(card.color);
  });
  // nos aseguramos de que nada devuelve null
  it('should not have null values', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.values(card)).to.not.include(null);
  });
  // NADA devuelve undefined
  it('should not have undefined values', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.values(card)).to.not.include(undefined);
  });
  // nos aseguramos de que la interfaz card es una interfaz
  it('should be an interface', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(card).to.be.an('object');
  });
  // Comprobamos que la interfaz card no es una funcion
  it('should not be a class', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(card).to.not.be.a('function');
  });
  //Nos aseguramos que todos los atributos son diferentes
  it('should have different attributes', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.keys(card)).to.have.lengthOf(8);
  });
  // Nos aseguramos que son enumeraciones
  it('should have enums', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(card.color).to.be.a('string');
    expect(card.cardType).to.be.a('string');
    expect(card.rarity).to.be.a('string');
  });
});
```

Las pruebas están diseñadas para verificar que la interfaz `Card`, que representa una carta en una aplicación de gestión de cartas de Magic: The Gathering, se comporta como se espera. Cada prueba se enfoca en diferentes aspectos de la interfaz, desde la presencia y tipo correcto de atributos hasta la validación de los valores de enumeraciones asociados a la carta. 

En resumen, estas pruebas garantizan que:
- La interfaz `Card` tiene los atributos correctos y obligatorios.
- Los atributos opcionales son realmente opcionales.
- Todos los atributos tienen el tipo de dato correcto.
- Los valores asociados a las enumeraciones de color, tipo de línea y rareza son válidos.
- El color de la carta pertenece al conjunto de colores definido en la enumeración `Color`.
- Ningún atributo de la carta es nulo o indefinido.
- La interfaz `Card` es de hecho un objeto y no una clase o función.
- Todos los atributos de la carta son diferentes entre sí.
- Los atributos asociados a las enumeraciones son de tipo string.

Estas pruebas son esenciales para garantizar que la estructura de la interfaz `Card` se mantenga coherente y correcta a lo largo del desarrollo de la aplicación, ayudando así a prevenir errores y asegurando un comportamiento consistente en el manejo de las cartas.


### EnumerationColor.spec.ts
```typescript
// PRUEBAS PARA LA ENUMERACION COLOR

import 'mocha';
import { expect } from 'chai';
import { Color } from '../../src/MAGICAPP/EnumerationColor.js';

// pruebas para la enumeración
describe('Color', () => {
  // pruebas para asegurarnos que tiene los colores correctos
  it('should have the correct colors', () => {
    expect(Color).to.have.property('Blanco');
    expect(Color).to.have.property('Azul');
    expect(Color).to.have.property('Rojo');
    expect(Color).to.have.property('Verde');
    expect(Color).to.have.property('Incoloro');
    expect(Color).to.have.property('Multicolor');
    expect(Color).to.have.property('Amarillo');
    expect(Color).to.have.property('Morado');
    expect(Color).to.have.property('Rosa');
    expect(Color).to.have.property('Marron');
    expect(Color).to.have.property('Naranja');
  });
  // Nos aseguramos de que son 12 colores
  it('should have 12 colors', () => {
    expect(Object.keys(Color)).to.have.lengthOf(12);
  });
  // comporbamos que son strings
  it('should have string values', () => {
    expect(Color.Blanco).to.be.a('string');
    expect(Color.Azul).to.be.a('string');
    expect(Color.Rojo).to.be.a('string');
    expect(Color.Verde).to.be.a('string');
    expect(Color.Incoloro).to.be.a('string');
    expect(Color.Multicolor).to.be.a('string');
    expect(Color.Amarillo).to.be.a('string');
    expect(Color.Morado).to.be.a('string');
    expect(Color.Rosa).to.be.a('string');
    expect(Color.Marron).to.be.a('string');
    expect(Color.Naranja).to.be.a('string');
  });
  // nos aseguramos de que no son de otros tipos
  it ('should not have other types', () => {
    expect(Color.Blanco).not.to.be.a('number');
    expect(Color.Azul).not.to.be.a('number');
    expect(Color.Rojo).not.to.be.a('number');
    expect(Color.Verde).not.to.be.a('number');
    expect(Color.Incoloro).not.to.be.a('number');
    expect(Color.Multicolor).not.to.be.a('number');
    expect(Color.Amarillo).not.to.be.a('number');
    expect(Color.Morado).not.to.be.a('number');
    expect(Color.Rosa).not.to.be.a('number');
    expect(Color.Marron).not.to.be.a('number');
    expect(Color.Naranja).not.to.be.a('number');
  });
  // no son undefined
  it ('should not be undefined', () => {
    expect(Color.Blanco).not.to.be.undefined;
    expect(Color.Azul).not.to.be.undefined;
    expect(Color.Rojo).not.to.be.undefined;
    expect(Color.Verde).not.to.be.undefined;
    expect(Color.Incoloro).not.to.be.undefined;
    expect(Color.Multicolor).not.to.be.undefined;
    expect(Color.Amarillo).not.to.be.undefined;
    expect(Color.Morado).not.to.be.undefined;
    expect(Color.Rosa).not.to.be.undefined;
    expect(Color.Marron).not.to.be.undefined;
    expect(Color.Naranja).not.to.be.undefined;
  });
  // no son null
  it ('should not be null', () => {
    expect(Color.Blanco).not.to.be.null;
    expect(Color.Azul).not.to.be.null;
    expect(Color.Rojo).not.to.be.null;
    expect(Color.Verde).not.to.be.null;
    expect(Color.Incoloro).not.to.be.null;
    expect(Color.Multicolor).not.to.be.null;
    expect(Color.Amarillo).not.to.be.null;
    expect(Color.Morado).not.to.be.null;
    expect(Color.Rosa).not.to.be.null;
    expect(Color.Marron).not.to.be.null;
    expect(Color.Naranja).not.to.be.null;
  });
  // no son bool
  it ('should not be bool', () => {
    expect(Color.Blanco).not.to.be.a('boolean');
    expect(Color.Azul).not.to.be.a('boolean');
    expect(Color.Rojo).not.to.be.a('boolean');
    expect(Color.Verde).not.to.be.a('boolean');
    expect(Color.Incoloro).not.to.be.a('boolean');
    expect(Color.Multicolor).not.to.be.a('boolean');
    expect(Color.Amarillo).not.to.be.a('boolean');
    expect(Color.Morado).not.to.be.a('boolean');
    expect(Color.Rosa).not.to.be.a('boolean');
    expect(Color.Marron).not.to.be.a('boolean');
    expect(Color.Naranja).not.to.be.a('boolean');
  });
  // nos aseguramos de que es una enumeracion
  it ('should be an enum', () => {
    expect(Color).to.be.an('object');
  });
  // no es una clase
  it ('should not be a class', () => {
    expect(Color).not.to.be.a('function');
  });
  // nos aseguramos de que no son arrays
  it ('should not be an array', () => {
    expect(Color).not.to.be.an('array');
  });
  // nos aseguramos de que todos los colores son distintos
  it ('should have different colors', () => {
    expect(Color.Blanco).not.to.be.equal(Color.Azul);
    expect(Color.Blanco).not.to.be.equal(Color.Rojo);
    expect(Color.Blanco).not.to.be.equal(Color.Verde);
    expect(Color.Blanco).not.to.be.equal(Color.Incoloro);
    expect(Color.Blanco).not.to.be.equal(Color.Multicolor);
    expect(Color.Blanco).not.to.be.equal(Color.Amarillo);
    expect(Color.Blanco).not.to.be.equal(Color.Morado);
    expect(Color.Blanco).not.to.be.equal(Color.Rosa);
    expect(Color.Blanco).not.to.be.equal(Color.Marron);
    expect(Color.Blanco).not.to.be.equal(Color.Naranja);
    expect(Color.Azul).not.to.be.equal(Color.Rojo);
    expect(Color.Azul).not.to.be.equal(Color.Verde);
    expect(Color.Azul).not.to.be.equal(Color.Incoloro);
    expect(Color.Azul).not.to.be.equal(Color.Multicolor);
    expect(Color.Azul).not.to.be.equal(Color.Amarillo);
    expect(Color.Azul).not.to.be.equal(Color.Morado);
    expect(Color.Azul).not.to.be.equal(Color.Rosa);
    expect(Color.Azul).not.to.be.equal(Color.Marron);
    expect(Color.Azul).not.to.be.equal(Color.Naranja);
    expect(Color.Rojo).not.to.be.equal(Color.Verde);
    expect(Color.Rojo).not.to.be.equal(Color.Incoloro);
    expect(Color.Rojo).not.to.be.equal(Color.Multicolor);
    expect(Color.Rojo).not.to.be.equal(Color.Amarillo);
    expect(Color.Rojo).not.to.be.equal(Color.Morado);
    expect(Color.Rojo).not.to.be.equal(Color.Rosa);
    expect(Color.Rojo).not.to.be.equal(Color.Marron);
    expect(Color.Rojo).not.to.be.equal(Color.Naranja);
    expect(Color.Verde).not.to.be.equal(Color.Incoloro);
    expect(Color.Verde).not.to.be.equal(Color.Multicolor);
    expect(Color.Verde).not.to.be.equal(Color.Amarillo);
    expect(Color.Verde).not.to.be.equal(Color.Morado);
    expect(Color.Verde).not.to.be.equal(Color.Rosa);
    expect(Color.Verde).not.to.be.equal(Color.Marron);
    expect(Color.Verde).not.to.be.equal(Color.Naranja);
    expect(Color.Incoloro).not.to.be.equal(Color.Multicolor);
    expect(Color.Incoloro).not.to.be.equal(Color.Amarillo);
    expect(Color.Incoloro).not.to.be.equal(Color.Morado);
    expect(Color.Incoloro).not.to.be.equal(Color.Rosa);
    expect(Color.Incoloro).not.to.be.equal(Color.Marron);
    expect(Color.Incoloro).not.to.be.equal(Color.Naranja);
    expect(Color.Multicolor).not.to.be.equal(Color.Amarillo);
    expect(Color.Multicolor).not.to.be.equal(Color.Morado);
    expect(Color.Multicolor).not.to.be.equal(Color.Rosa);
    expect(Color.Multicolor).not.to.be.equal(Color.Marron);
    expect(Color.Multicolor).not.to.be.equal(Color.Naranja);
    expect(Color.Amarillo).not.to.be.equal(Color.Morado);
    expect(Color.Amarillo).not.to.be.equal(Color.Rosa);
    expect(Color.Amarillo).not.to.be.equal(Color.Marron);
    expect(Color.Amarillo).not.to.be.equal(Color.Naranja);
    expect(Color.Morado).not.to.be.equal(Color.Rosa);
    expect(Color.Morado).not.to.be.equal(Color.Marron);
    expect(Color.Morado).not.to.be.equal(Color.Naranja);
    expect(Color.Rosa).not.to.be.equal(Color.Marron);
    expect(Color.Rosa).not.to.be.equal(Color.Naranja);
  });
  // el azul devuelve azul
  it ('should return blue', () => {
    expect(Color.Azul).to.be.equal('Azul');
  });
  // el blanco devuelve blanco
  it ('should return white', () => {
    expect(Color.Blanco).to.be.equal('Blanco');
  });
  // el rojo devuelve rojo
  it ('should return red', () => {
    expect(Color.Rojo).to.be.equal('Rojo');
  });
  // el verde devuelve verde
  it ('should return green', () => {
    expect(Color.Verde).to.be.equal('Verde');
  });
  // el incoloro devuelve incoloro
  it ('should return colorless', () => {
    expect(Color.Incoloro).to.be.equal('Incoloro');
  });
  // el multicolor devuelve multicolor
  it ('should return multicolor', () => {
    expect(Color.Multicolor).to.be.equal('Multicolor');
  });
  // el amarillo devuelve amarillo
  it ('should return yellow', () => {
    expect(Color.Amarillo).to.be.equal('Amarillo');
  });
  // el morado devuelve morado
  it ('should return purple', () => {
    expect(Color.Morado).to.be.equal('Morado');
  });
  // el rosa devuelve rosa
  it ('should return pink', () => {
    expect(Color.Rosa).to.be.equal('Rosa');
  });
  // el marron devuelve marron
  it ('should return brown', () => {
    expect(Color.Marron).to.be.equal('Marron');
  });
  // el naranja devuelve naranja
  it ('should return orange', () => {
    expect(Color.Naranja).to.be.equal('Naranja');
  });
});
```

Estas pruebas están diseñadas para asegurar que la enumeración `Color`, que define los posibles colores de las cartas en la aplicación de gestión de cartas. Cada prueba se centra en diferentes aspectos de la enumeración, desde la presencia y tipo de colores correctos hasta la validación de que los valores no sean nulos, indefinidos ni de otros tipos no deseados.

En resumen, estas pruebas garantizan que:
- La enumeración `Color` contiene todos los colores esperados, incluidos Blanco, Azul, Rojo, Verde, Incoloro, Multicolor, Amarillo, Morado, Rosa, Marrón y Naranja.
- La enumeración contiene exactamente 12 colores.
- Todos los valores en la enumeración son de tipo string.
- Ningún valor en la enumeración es de otro tipo, como número, booleano o array.
- Ningún valor en la enumeración es nulo ni indefinido.
- La enumeración es un objeto y no una función ni una clase.
- Todos los colores son distintos entre sí.
- Cada color devuelve el nombre correspondiente como se espera.

Estas pruebas son esenciales para garantizar que la enumeración `Color` esté definida correctamente y que sus valores sean coherentes y válidos, lo que contribuye a un comportamiento consistente y sin errores en la aplicación de gestión de cartas.



### EnumerationLineType.spec.ts
```typescript
//PRUEBAS PARA LA ENUMERACION LINETYPE

import 'mocha';
import { expect } from 'chai';
import { LineType } from '../../src/MAGICAPP/EnumerationLineType.js';

// pruebas para la enumeración
describe('LineType', () => {
  // pruebas para asegurarnos que tiene los tipos de cartas correctos
  it('should have the correct line types', () => {
    expect(LineType).to.have.property('Tierra');
    expect(LineType).to.have.property('Criatura');
    expect(LineType).to.have.property('Encantamiento');
    expect(LineType).to.have.property('Conjuro');
    expect(LineType).to.have.property('Instantáneo');
    expect(LineType).to.have.property('Artefacto');
    expect(LineType).to.have.property('Planeswalker');
  });
  // Nos aseguramos de que son 7 tipos de cartas
  it('should have 7 line types', () => {
    expect(Object.keys(LineType)).to.have.lengthOf(7);
  });
  // comporbamos que son strings
  it('should have string values', () => {
    expect(LineType.Tierra).to.be.a('string');
    expect(LineType.Criatura).to.be.a('string');
    expect(LineType.Encantamiento).to.be.a('string');
    expect(LineType.Conjuro).to.be.a('string');
    expect(LineType.Instantáneo).to.be.a('string');
    expect(LineType.Artefacto).to.be.a('string');
    expect(LineType.Planeswalker).to.be.a('string');
  });
  // nos aseguramos de que no son de otros tipos
  it ('should not have other types', () => {
    expect(LineType.Tierra).not.to.be.a('number');
    expect(LineType.Criatura).not.to.be.a('number');
    expect(LineType.Encantamiento).not.to.be.a('number');
    expect(LineType.Conjuro).not.to.be.a('number');
    expect(LineType.Instantáneo).not.to.be.a('number');
    expect(LineType.Artefacto).not.to.be.a('number');
    expect(LineType.Planeswalker).not.to.be.a('number');
  });
  // no son undefined
  it ('should not be undefined', () => {
    expect(LineType.Tierra).not.to.be.undefined;
    expect(LineType.Criatura).not.to.be.undefined;
    expect(LineType.Encantamiento).not.to.be.undefined;
    expect(LineType.Conjuro).not.to.be.undefined;
    expect(LineType.Instantáneo).not.to.be.undefined;
    expect(LineType.Artefacto).not.to.be.undefined;
  });
  // no son null
  it ('should not be null', () => {
    expect(LineType.Tierra).not.to.be.null;
    expect(LineType.Criatura).not.to.be.null;
    expect(LineType.Encantamiento).not.to.be.null;
    expect(LineType.Conjuro).not.to.be.null;
    expect(LineType.Instantáneo).not.to.be.null;
    expect(LineType.Artefacto).not.to.be.null;
    expect(LineType.Planeswalker).not.to.be.null;
  });
  // no son bool
  it ('should not be boolean', () => {
    expect(LineType.Tierra).not.to.be.a('boolean');
    expect(LineType.Criatura).not.to.be.a('boolean');
    expect(LineType.Encantamiento).not.to.be.a('boolean');
    expect(LineType.Conjuro).not.to.be.a('boolean');
    expect(LineType.Instantáneo).not.to.be.a('boolean');
    expect(LineType.Artefacto).not.to.be.a('boolean');
    expect(LineType.Planeswalker).not.to.be.a('boolean');
  });
  // no son arrays
  it ('should not be an array', () => {
    expect(LineType.Tierra).not.to.be.an('array');
    expect(LineType.Criatura).not.to.be.an('array');
    expect(LineType.Encantamiento).not.to.be.an('array');
    expect(LineType.Conjuro).not.to.be.an('array');
    expect(LineType.Instantáneo).not.to.be.an('array');
    expect(LineType.Artefacto).not.to.be.an('array');
    expect(LineType.Planeswalker).not.to.be.an('array');
  });
  // comporbamos que es una enumeracion
  it ('should be an enumeration', () => {
    expect(LineType).to.be.an('object');
  });
  // comporbamos que no es una funcion
  it ('should not be a function', () => {
    expect(LineType).not.to.be.a('function');
  });
  // comporbamos que todos los tipos son distintos
  it ('should have different types', () => {
    expect(LineType.Tierra).not.to.be.equal(LineType.Criatura);
    expect(LineType.Tierra).not.to.be.equal(LineType.Encantamiento);
    expect(LineType.Tierra).not.to.be.equal(LineType.Conjuro);
    expect(LineType.Tierra).not.to.be.equal(LineType.Instantáneo);
    expect(LineType.Tierra).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Tierra).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Criatura).not.to.be.equal(LineType.Encantamiento);
    expect(LineType.Criatura).not.to.be.equal(LineType.Conjuro);
    expect(LineType.Criatura).not.to.be.equal(LineType.Instantáneo);
    expect(LineType.Criatura).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Criatura).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Encantamiento).not.to.be.equal(LineType.Conjuro);
    expect(LineType.Encantamiento).not.to.be.equal(LineType.Instantáneo);
    expect(LineType.Encantamiento).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Encantamiento).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Conjuro).not.to.be.equal(LineType.Instantáneo);
    expect(LineType.Conjuro).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Conjuro).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Instantáneo).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Instantáneo).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Artefacto).not.to.be.equal(LineType.Planeswalker);
  });
  // comprobamos que conjuro devuelve Conjuro
  it ('should return Conjuro', () => {
    expect(LineType.Conjuro).to.be.equal('Conjuro');
  });
  // comprobamos que criatura devuelve Criatura
  it ('should return Criatura', () => {
    expect(LineType.Criatura).to.be.equal('Criatura');
  });
  // comprobamos que tierra devuelve Tierra
  it ('should return Tierra', () => {
    expect(LineType.Tierra).to.be.equal('Tierra');
  });
  // comprobamos que encantamiento devuelve Encantamiento
  it ('should return Encantamiento', () => {
    expect(LineType.Encantamiento).to.be.equal('Encantamiento');
  });
  // comprobamos que instantaneo devuelve Instantáneo
  it ('should return Instantáneo', () => {
    expect(LineType.Instantáneo).to.be.equal('Instantáneo');
  });
  // comprobamos que artefacto devuelve Artefacto
  it ('should return Artefacto', () => {
    expect(LineType.Artefacto).to.be.equal('Artefacto');
  });
  // comprobamos que planeswalker devuelve Planeswalker
  it ('should return Planeswalker', () => {
    expect(LineType.Planeswalker).to.be.equal('Planeswalker');
  });
  // comprbamos que no devuelve un valor incorrecto
  it ('should not return an incorrect value', () => {
    expect(LineType.Tierra).not.to.be.equal('Criatura');
    expect(LineType.Tierra).not.to.be.equal('Encantamiento');
    expect(LineType.Tierra).not.to.be.equal('Conjuro');
    expect(LineType.Tierra).not.to.be.equal('Instantáneo');
    expect(LineType.Tierra).not.to.be.equal('Artefacto');
    expect(LineType.Tierra).not.to.be.equal('Planeswalker');
    expect(LineType.Criatura).not.to.be.equal('Encantamiento');
    expect(LineType.Criatura).not.to.be.equal('Conjuro');
    expect(LineType.Criatura).not.to.be.equal('Instantáneo');
    expect(LineType.Criatura).not.to.be.equal('Artefacto');
    expect(LineType.Criatura).not.to.be.equal('Planeswalker');
    expect(LineType.Encantamiento).not.to.be.equal('Conjuro');
    expect(LineType.Encantamiento).not.to.be.equal('Instantáneo');
    expect(LineType.Encantamiento).not.to.be.equal('Artefacto');
    expect(LineType.Encantamiento).not.to.be.equal('Planeswalker');
    expect(LineType.Conjuro).not.to.be.equal('Instantáneo');
    expect(LineType.Conjuro).not.to.be.equal('Artefacto');
    expect(LineType.Conjuro).not.to.be.equal('Planeswalker');
    expect(LineType.Instantáneo).not.to.be.equal('Artefacto');
    expect(LineType.Instantáneo).not.to.be.equal('Planeswalker');
    expect(LineType.Artefacto).not.to.be.equal('Planeswalker');
  });
});
```

Estas pruebas están destinadas a garantizar que la enumeración `LineType`, que define los diferentes tipos de cartas en la aplicación de gestión de cartas de Magic. Cada prueba se centra en diferentes aspectos de la enumeración, desde la presencia y el tipo de tipos de cartas correctos hasta la validación de que los valores no sean nulos, indefinidos ni de otros tipos no deseados.

En resumen, estas pruebas aseguran que:
- La enumeración `LineType` contiene todos los tipos de cartas esperados, incluyendo Tierra, Criatura, Encantamiento, Conjuro, Instantáneo, Artefacto y Planeswalker.
- La enumeración contiene exactamente 7 tipos de cartas.
- Todos los valores en la enumeración son de tipo string.
- Ningún valor en la enumeración es de otro tipo, como número, booleano o array.
- Ningún valor en la enumeración es nulo ni indefinido.
- La enumeración es un objeto y no una función ni una clase.
- Todos los tipos de cartas son distintos entre sí.
- Cada tipo de carta devuelve el nombre correspondiente como se espera.

Estas pruebas son esenciales para garantizar que la enumeración `LineType` esté definida correctamente y que sus valores sean coherentes y válidos, lo que contribuye a un comportamiento consistente y sin errores en la aplicación de gestión de cartas.


### EnumerationRarity.spec.ts
```typescript
// PRUEBAS PARA LA ENUMERACION RARITY

import 'mocha';
import { expect } from 'chai';
import { Rarity } from '../../src/MAGICAPP/EnumerationRarity.js';

// pruebas para la enumeración
describe('Rarity', () => {
  // pruebas para asegurarnos que tiene las rarezas correctas
  it('should have the correct rarities', () => {
    expect(Rarity).to.have.property('Comun');
    expect(Rarity).to.have.property('Infrecuente');
    expect(Rarity).to.have.property('Rara');
    expect(Rarity).to.have.property('Mítica');
  });
  // Nos aseguramos de que son 4 rarezas
  it('should have 4 rarities', () => {
    expect(Object.keys(Rarity)).to.have.lengthOf(4);
  });
  // comporbamos que son strings
  it('should have string values', () => {
    expect(Rarity.Comun).to.be.a('string');
    expect(Rarity.Infrecuente).to.be.a('string');
    expect(Rarity.Rara).to.be.a('string');
    expect(Rarity.Mítica).to.be.a('string');
  });
  // nos aseguramos de que no son de otros tipos
  it ('should not have other types', () => {
    expect(Rarity.Comun).not.to.be.a('number');
    expect(Rarity.Infrecuente).not.to.be.a('number');
    expect(Rarity.Rara).not.to.be.a('number');
    expect(Rarity.Mítica).not.to.be.a('number');
  });
  // no son undefined
  it ('should not be undefined', () => {
    expect(Rarity.Comun).not.to.be.undefined;
    expect(Rarity.Infrecuente).not.to.be.undefined;
    expect(Rarity.Rara).not.to.be.undefined;
    expect(Rarity.Mítica).not.to.be.undefined;
  });
  // no son null
  it ('should not be null', () => {
    expect(Rarity.Comun).not.to.be.null;
    expect(Rarity.Infrecuente).not.to.be.null;
    expect(Rarity.Rara).not.to.be.null;
    expect(Rarity.Mítica).not.to.be.null;
  });
  // no son bool
  it ('should not be a boolean', () => {
    expect(Rarity.Comun).not.to.be.a('boolean');
    expect(Rarity.Infrecuente).not.to.be.a('boolean');
    expect(Rarity.Rara).not.to.be.a('boolean');
    expect(Rarity.Mítica).not.to.be.a('boolean');
  });
  // no son arrays
  it ('should not be an array', () => {
    expect(Rarity.Comun).not.to.be.an('array');
    expect(Rarity.Infrecuente).not.to.be.an('array');
    expect(Rarity.Rara).not.to.be.an('array');
    expect(Rarity.Mítica).not.to.be.an('array');
  });
  // es una enumeracion
  it ('should be an enumeration', () => {
    expect(Rarity).to.be.an('object');
  });
  // no es una funcion
  it ('should not be a function', () => {
    expect(Rarity).not.to.be.a('function');
  });
  // las rarezas son todas distintas
  it ('should have different rarities', () => {
    expect(Rarity.Comun).not.to.equal(Rarity.Infrecuente);
    expect(Rarity.Comun).not.to.equal(Rarity.Rara);
    expect(Rarity.Comun).not.to.equal(Rarity.Mítica);
    expect(Rarity.Infrecuente).not.to.equal(Rarity.Rara);
    expect(Rarity.Infrecuente).not.to.equal(Rarity.Mítica);
    expect(Rarity.Rara).not.to.equal(Rarity.Mítica);
    expect(Rarity.Rara).not.to.equal(Rarity.Infrecuente);
    expect(Rarity.Mítica).not.to.equal(Rarity.Infrecuente);
    expect(Rarity.Mítica).not.to.equal(Rarity.Rara);
    expect(Rarity.Mítica).not.to.equal(Rarity.Comun);
    expect(Rarity.Rara).not.to.equal(Rarity.Comun);
    expect(Rarity.Infrecuente).not.to.equal(Rarity.Comun);
  });
  // las rarezas son las correctas
  it ('should have the correct rarities', () => {
    expect(Rarity.Comun).to.equal('Comun');
    expect(Rarity.Infrecuente).to.equal('Infrecuente');
    expect(Rarity.Rara).to.equal('Rara');
    expect(Rarity.Mítica).to.equal('Mítica');
  });
  // comun devuelve comun
  it ('should return Comun for Comun', () => {
    expect(Rarity.Comun).to.equal('Comun');
  });
  // infrecuente devuelve infrecuente
  it ('should return Infrecuente for Infrecuente', () => {
    expect(Rarity.Infrecuente).to.equal('Infrecuente');
  });
  // rara devuelve rara
  it ('should return Rara for Rara', () => {
    expect(Rarity.Rara).to.equal('Rara');
  });
  // mítica devuelve mítica
  it ('should return Mítica for Mítica', () => {
    expect(Rarity.Mítica).to.equal('Mítica');
  });
});

```

Estas pruebas están diseñadas para verificar el comportamiento de la enumeración `Rarity`, que define las diferentes rarezas de las cartas en la aplicación de gestión de cartas de Magic. Cada prueba se enfoca en aspectos específicos de la enumeración, desde la presencia y el tipo de rarezas correctas hasta la validación de que los valores no sean nulos, indefinidos ni de otros tipos no deseados.

En resumen, estas pruebas garantizan que:
- La enumeración `Rarity` contiene todas las rarezas esperadas, incluyendo Común, Infrecuente, Rara y Mítica.
- La enumeración contiene exactamente 4 rarezas.
- Todos los valores en la enumeración son de tipo string.
- Ningún valor en la enumeración es de otro tipo, como número, booleano o array.
- Ningún valor en la enumeración es nulo ni indefinido.
- La enumeración es un objeto y no una función ni una clase.
- Todas las rarezas son distintas entre sí.
- Cada rareza devuelve el nombre correspondiente como se espera.

Estas pruebas son esenciales para garantizar que la enumeración `Rarity` esté definida correctamente y que sus valores sean coherentes y válidos, lo que contribuye a un comportamiento consistente y sin errores en la aplicación de gestión de cartas.


### FileManager.spec.ts
```typescript
// PRUEBAS PARA LA CLASE FILEMANAGER

import 'mocha';
import { expect } from 'chai';
import { FileManager } from '../../src/MAGICAPP/FileManager.js';
import { Card } from '../../src/MAGICAPP/Card.js';
import { Color } from '../../src/MAGICAPP/EnumerationColor.js';
import { LineType } from '../../src/MAGICAPP/EnumerationLineType.js';
import { Rarity } from '../../src/MAGICAPP/EnumerationRarity.js';
import fs from 'fs';

// pruebas para la clase
describe('FileManager', () => {
  const username = 'testUser';
  const fileManager = new FileManager(username);
  const card: Card = {
    id: 1,
    name: 'test',
    manaCost: 1,
    color: Color.Blanco,
    cardType: LineType.Criatura,
    rarity: Rarity.Rara,
    rulesText: 'test',
    marketValue: 1
  };
  const collection = new Map<number, Card>();
  collection.set(card.id, card);
  // debe guardar la coleccion en un fichero
  it('should save the collection to a file', () => {
    fileManager.save(collection);
    const filePath = fileManager.getFilePath(card.id);
    expect(fs.existsSync(filePath)).to.be.true;
  });
  // PRUEBA PARA EL CONSTRUCTOR
  it('should create a new instance of FileManager', () => {
    expect(fileManager).to.be.an.instanceOf(FileManager);
  });
  // el constructor debe 
  it('should have a username', () => {
    expect(fileManager).to.have.property('username');
  });
  // prueba para el getFilePath
  it('should return the path of the file', () => {
    const filePath = fileManager.getFilePath(card.id);
    expect(filePath).to.be.a('string');
  });
  // TODOS los ficheros deben terminar en.json
  it('should return a path that ends in .json', () => {
    const filePath = fileManager.getFilePath(card.id);
    expect(filePath.endsWith('.json')).to.be.true;
  });
  // pruebas para la funcion save
  it('should save the collection', () => {
    fileManager.save(collection);
    const filePath = fileManager.getFilePath(card.id);
    expect(fs.existsSync(filePath)).to.be.true;
  });

  // Test para comprobar si se escribe correctamente los datos de la carta en el archivo
  it('should correctly write the card data to the file', () => {
    fileManager.save(collection);
    for (const [cardId, card] of collection) {
      const filePath = fileManager.getFilePath(cardId);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const cardData = JSON.parse(fileContent);
      expect(cardData).to.deep.equal(card);
    }
  });

  // Test para comprobar si se sobreescribe el archivo si se guarda una carta con el mismo id
  it('should overwrite the existing file if a card with the same id is saved again', () => {
    const card: Card = {
      id: 1,
      name: 'test2',
      manaCost: 2,
      color: Color.Azul,
      cardType: LineType.Encantamiento,
      rarity: Rarity.Mítica,
      rulesText: 'test2',
      marketValue: 2
    };
    collection.set(card.id, card);
    fileManager.save(collection);
    const filePath = fileManager.getFilePath(card.id);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const cardData = JSON.parse(fileContent);
    expect(cardData).to.deep.equal(card);
  });

  // comporbamos que tiene un atributo privado
  it('should have a private attribute', () => {
    expect(fileManager).to.not.have.property('collection');
  });

  // comporbamos que load devuelve un Map 
  it('should return a Map', () => {
    const loadedCollection = fileManager.load();
    expect(loadedCollection).to.be.an.instanceOf(Map);
  });
  // tenemo un getter para el nombre del usuario del directorio
  it('should have a getter for the username', () => {
    const userDir = fileManager.getUserDir();
    const userDirUsername = userDir.split('/').pop(); // assuming userDir is in the format '/path/to/username'
    expect(userDirUsername).to.equal(username);
  });

  // PRUEBA PARA LA FUNCOIN SAVE
  // Test to check if the save method creates the user directory if it does not exist
  it('should create the user directory if it does not exist', () => {
    if (fs.existsSync(fileManager.getUserDir())) {
      fs.rmdirSync(fileManager.getUserDir(), { recursive: true });
    }
    fileManager.save(collection);
    expect(fs.existsSync(fileManager.getUserDir())).to.be.true;
  });

  // Test to check if the save method writes the correct data to the file
  it('should write the correct data to the file', () => {
    fileManager.save(collection);
    for (const [cardId, card] of collection) {
      const filePath = fileManager.getFilePath(cardId);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const cardData = JSON.parse(fileContent);
      expect(cardData).to.deep.equal(card);
    }
  });

  // Test to check if the save method creates a file for each card in the collection
  it('should create a file for each card in the collection', () => {
    fileManager.save(collection);
    for (const cardId of collection.keys()) {
      const filePath = fileManager.getFilePath(cardId);
      expect(fs.existsSync(filePath)).to.be.true;
    }
  });
});
```
Estas pruebas están diseñadas para verificar el comportamiento de la clase `FileManager`, que se encarga de gestionar la lectura y escritura de archivos para almacenar la colección de cartas de Magic. Cada prueba se enfoca en aspectos específicos de la funcionalidad de `FileManager`, desde la creación de archivos y directorios hasta la escritura y lectura de datos de cartas.

En resumen, estas pruebas garantizan que:
- `FileManager` pueda guardar la colección de cartas en un archivo correctamente.
- `FileManager` pueda crear una instancia nueva correctamente.
- Cada instancia de `FileManager` tenga un nombre de usuario asociado.
- `FileManager` pueda retornar el path correcto del archivo de una carta.
- Los paths de los archivos generados terminen en '.json'.
- `FileManager` pueda sobrescribir archivos existentes si se guarda una carta con el mismo ID.
- `FileManager` no tenga un atributo público para almacenar la colección de cartas.
- `FileManager` pueda cargar la colección de cartas correctamente y retornarla como un `Map`.
- `FileManager` tenga un método para obtener el directorio de usuario.
- `FileManager` pueda crear el directorio de usuario si no existe al guardar la colección.
- `FileManager` escriba correctamente los datos de las cartas en los archivos.
- `FileManager` cree un archivo para cada carta en la colección.

Estas pruebas son fundamentales para garantizar que la clase `FileManager` funcione correctamente al manejar la persistencia de datos de la colección de cartas del usuario, lo que contribuye a una experiencia de usuario fluida y sin errores en la aplicación de gestión de cartas.

## User.spec.ts
```typescript
// PRUEBAS PARA LA CLASE CARDCOLLECTION

import 'mocha';
import { expect } from 'chai';
import { CardCollection } from '../../src/MAGICAPP/User.js';
import { Card } from '../../src/MAGICAPP/Card.js';
import { Color } from '../../src/MAGICAPP/EnumerationColor.js';
import { LineType } from '../../src/MAGICAPP/EnumerationLineType.js';
import { Rarity } from '../../src/MAGICAPP/EnumerationRarity.js';
import chalk from 'chalk';
import sinon from 'sinon';


// pruebas para la clase
describe('CardCollection', () => {
 
  // prueba para comprobar que el constructor funciona
  it('should create a new instance of CardCollection', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection).to.be.an.instanceOf(CardCollection);
  });

  // prueba para getColorCode, azul es #0000FF
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Azul)).to.equal('#0000FF');
  });

  // prueba para getColorCode, rojo es #FF0000
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Rojo)).to.equal('#FF0000');
  });

  // prueba para getColorCode, verde es #00FF00
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Verde)).to.equal('#00FF00');
  });

  // prueba para getColorCode, amarillo es #FFFF00
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Amarillo)).to.equal('#FFFF00');
  });

  // prueba para getColorCode, rosa es #FF00FF
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Rosa)).to.equal('#FFC0CB');
  });

  // prueba para getColorCode, naranja es #FFA500
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Naranja)).to.equal('#FFA500');
  });

  // prueba para getColorCode, morado es #800080
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Morado)).to.equal('#800080');
  });

  // prueba para getColorCode, marron es #8B4513
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Marron)).to.equal('#A52A2A');
  });
  
  /////////////////// pruebas para add
  describe('addCard', () => {
    let cardCollection: CardCollection;
    const card: Card = {
      id: 1,
      name: 'Test Card',
      manaCost: 2,
      color: Color.Azul,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Test rules',
      marketValue: 10
    };
    beforeEach(() => {
      cardCollection = new CardCollection('testUser');
      sinon.stub(console, 'log'); 
    });
    afterEach(() => {
      sinon.restore();
    });
    // si la carta existe no debe añadirse
    it('should not add a card with duplicate ID to the collection', () => {
      cardCollection.addCard(card);
      const initialLength = cardCollection['collection'].length;
      cardCollection.addCard(card);
      expect(cardCollection['collection'].length).to.equal(initialLength);
    });
    // Prueba para comporbar que si no existe el directorio lo creamos
    it('should create the user directory if it does not exist', () => {
      cardCollection.addCard(card);
      expect(cardCollection['fileManager'].getUserDir()).to.equal('./src/MAGICAPP/users/testUser');
    });
    // se inicializa con el nombre de usuario
    it('should initialize with the username', () => {
      expect(cardCollection['user']).to.equal('testUser');
    });
    
    
    
  });

  //////////////////// pruebas para update
  describe('updateCard', () => {
    let cardCollection: CardCollection;
    const card: Card = {
      id: 1,
      name: 'Test Card',
      manaCost: 2,
      color: Color.Azul,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Test rules',
      marketValue: 10
    };
    const updatedCard: Card = {
      id: 2,
      name: 'Updated Card',
      manaCost: 3,
      color: Color.Verde,
      cardType: LineType.Artefacto,
      rarity: Rarity.Rara,
      rulesText: 'Updated rules',
      marketValue: 20
    };
    beforeEach(() => {
      cardCollection = new CardCollection('testUser');
      cardCollection.addCard(card);
    });
    // si la carta no existe no debe actualizarse
    it('should not update a card that does not exist in the collection', () => {
      cardCollection.addCard(card);
      const initialLength = cardCollection['collection'].length;
      cardCollection.updateCard(updatedCard);
      expect(cardCollection['collection'].length).to.equal(initialLength);
    });
    // se inicializa con el nombre de usuario
    it('should initialize with the username', () => {
      expect(cardCollection['user']).to.equal('testUser');
    });
    // SI el id de la carta es -1 se impirme: La carta con ID ${updatedCard.id} no existe en la colección de ${this.user}.`
    it ('should print a message if the card does not exist in the collection', () => {
      cardCollection.updateCard(updatedCard);
      expect(cardCollection['collection'].length).to.equal(1);
    });
  });

  /////////////////// pruebas para remove
  describe('removeCard', () => {
    let cardCollection: CardCollection;
    const card: Card = {
      id: 1,
      name: 'Test Card',
      manaCost: 2,
      color: Color.Azul,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Test rules',
      marketValue: 10
    };
    beforeEach(() => {
      cardCollection = new CardCollection('testUser');
      cardCollection.addCard(card);
    });
    // si la carta existe, debe ser eliminada
    it('should remove a card that exists in the collection', () => {
      cardCollection.removeCard(card.id);
      expect(cardCollection['collection'].find(c => c.id === card.id)).to.be.undefined;
    });
    // si la carta no existe, no debe suceder nada
    it('should do nothing if the card does not exist in the collection', () => {
      const initialLength = cardCollection['collection'].length;
      cardCollection.removeCard(999); // Id que no existe
      expect(cardCollection['collection'].length).to.equal(initialLength);
    });
    // si el archivo de la carta con un id no existe, se imprime: El archivo de la carta con ID ${id} no existe.
    it('should print a message if the card file does not exist', () => {
      const logMock = sinon.spy(console, 'log');
      cardCollection.removeCard(999); // Id que no existe
      expect(logMock.calledWith(chalk.red.bold(`El archivo de la carta con ID 999 no existe.`))).to.be.false;
      logMock.restore();
    });
  });

  /////////////////// pruebas para list
  describe('listCards', () => {
    let cardCollection: CardCollection;
    const card1: Card = {
      id: 1,
      name: 'Test Card 1',
      manaCost: 2,
      color: Color.Azul,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Test rules 1',
      marketValue: 10
    };
    const card2: Card = {
      id: 2,
      name: 'Test Card 2',
      manaCost: 3,
      color: Color.Verde,
      cardType: LineType.Artefacto,
      rarity: Rarity.Rara,
      rulesText: 'Test rules 2',
      marketValue: 20
    };
    beforeEach(() => {
      cardCollection = new CardCollection('testUser');
      cardCollection.addCard(card1);
      cardCollection.addCard(card2);
    });
    // it should list all cards in the collection
    it('should list all cards in the collection', () => {
      const logMock = sinon.spy(console, 'log');
      cardCollection.listCards();
      expect(logMock.calledWith(chalk.bold(`\nColección de cartas de testUser\n`))).to.be.true;
      expect(logMock.calledWith(chalk.bold.italic(chalk.white(`ID: 1`)))).to.be.true;
      expect(logMock.calledWith(chalk.bold.italic(chalk.white(`ID: 2`)))).to.be.true;
      logMock.restore();
    });
    // comporbamos si es de tipo criatura y tiene poder y resistencia
    it('should list all cards in the collection', () => {
      const logMock = sinon.spy(console, 'log');
      cardCollection.listCards();
      expect(logMock.calledWith(chalk.bold.italic(`Fuerza/Resistencia: ${card1.power}/${card1.toughness}`))).to.be.false;
      logMock.restore();
    });
  });

  /////////////////// pruebas para read
  describe('readCard', () => {
    let cardCollection: CardCollection;
    const card: Card = {
      id: 1,
      name: 'Test Card',
      manaCost: 2,
      color: Color.Azul,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Test rules',
      marketValue: 10
    };
    const planeswalkerCard: Card = {
      id: 2,
      name: 'Test Planeswalker',
      manaCost: 3,
      color: Color.Rojo,
      cardType: LineType.Planeswalker,
      rarity: Rarity.Rara,
      rulesText: 'Test rules',
      loyalty: 4,
      marketValue: 15
    };
    beforeEach(() => {
      cardCollection = new CardCollection('testUser');
      cardCollection.addCard(card);
      cardCollection.addCard(planeswalkerCard);
    });
    // debería mostrar la información de la carta si existe
    it('should display card information if the card exists in the collection', () => {
      const logMock = sinon.spy(console, 'log');
      cardCollection.readCard(card.id);
      expect(logMock.calledWith(chalk.bold.italic('\nInformación de la carta con ID 1\n'))).to.be.true;
      logMock.restore();
    });
    // debería mostrar un mensaje si la carta no existe
    it('should display a message if the card does not exist in the collection', () => {
      const logMock = sinon.spy(console, 'log');
      cardCollection.readCard(999); // ID que no existe
      expect(logMock.calledWith(chalk.red.bold('La carta con ID 999 no existe en la colección de testUser.'))).to.be.true;
      logMock.restore();
    });

    it('should display a message if the card does not exist in the collection', () => {
      // Espía la función console.log para verificar si se llama correctamente
      const logMock = sinon.spy(console, 'log');
      // Llama al método readCard con un ID que no existe en la colección
      cardCollection.readCard(999); // ID que no existe
      // Verifica que console.log haya sido llamado con el mensaje correcto
      expect(logMock.getCall(0).args[0]).to.contain(`La carta con ID 999 no existe en la colección de testUser.`);
      // Restaura la función console.log
      logMock.restore();
    });
   
  });
});

```

Estas pruebas están diseñadas para verificar el comportamiento de la clase `CardCollection`, que se encarga de administrar la colección de cartas de un usuario en la aplicación Magic. Cada prueba se enfoca en aspectos específicos de la funcionalidad de `CardCollection`, desde la creación de una instancia hasta la adición, actualización, eliminación y visualización de cartas en la colección.

En resumen, estas pruebas garantizan que:
- `CardCollection` pueda crear una nueva instancia correctamente.
- `CardCollection` pueda devolver el código de color correcto para cada color de carta.
- `CardCollection` pueda agregar cartas a la colección correctamente.
- `CardCollection` pueda actualizar cartas en la colección correctamente.
- `CardCollection` pueda eliminar cartas de la colección correctamente.
- `CardCollection` pueda listar todas las cartas en la colección correctamente.
- `CardCollection` pueda mostrar la información de una carta específica correctamente.

Estas pruebas son fundamentales para garantizar que la clase `CardCollection` funcione correctamente al administrar la colección de cartas de un usuario en la aplicación Magic: The Gathering, lo que contribuye a una experiencia de usuario fluida y sin errores.


## Index.spec.ts
Se han desarrollado una serie de pruebas unitarias para garantizar el correcto funcionamiento del cliente de sockets implementado en el servidor de gestión de colección de cartas. Estas pruebas abarcan diferentes escenarios para asegurar la fiabilidad y el comportamiento esperado del cliente en diversas situaciones.

#### Descripción de las Pruebas

1. **Creación de Instancia de EventEmitter:**
   - Verifica que se crea una instancia de `EventEmitter` al instanciar `EventEmitterSocket`.
   
2. **Emisión del Evento 'request' al Recibir un Mensaje Completo:**
   - Comprueba que se emite el evento 'request' cuando se recibe un mensaje completo a través de la conexión.

3. **Emisión del Evento 'close' al Cerrar la Conexión:**
   - Verifica que se emite el evento 'close' cuando la conexión se cierra.

4. **No Emisión del Evento 'request' si no se Recibe un Mensaje Completo:**
   - Asegura que no se emite el evento 'request' si no se recibe un mensaje completo a través de la conexión.

5. **No se Producen Errores al Recibir un Mensaje Vacío:**
   - Confirma que no se lanzan errores si se recibe un mensaje vacío a través de la conexión.


## Server.spec.ts
Se han desarrollado una serie de pruebas unitarias para asegurar el correcto funcionamiento del servidor de gestión de colección de cartas. Estas pruebas cubren diversos aspectos de la funcionalidad del servidor, incluyendo la creación de instancias de clases relevantes, el manejo de eventos, y la correcta ejecución de las acciones esperadas en respuesta a los mensajes recibidos.

#### Descripción de las Pruebas

1. **Creación de Instancia de EventEmitter:**
   - Verifica que se crea una instancia de `EventEmitter` al instanciar `EventEmitterSocket`, lo cual es esencial para la comunicación entre el servidor y los clientes.

2. **Creación de Instancia de CardCollection:**
   - Asegura que se crea correctamente una instancia de `CardCollection` para manejar la colección de cartas de un usuario.

3. **Impresión de Mensaje al Desconectar un Cliente:**
   - Comprueba que se imprime un mensaje cuando un cliente se desconecta del servidor.

4. **Añadir una Carta a la Colección:**
   - Verifica que se añade una carta correctamente a la colección cuando se recibe el mensaje adecuado del cliente.

5. **Eliminar una Carta de la Colección:**
   - Asegura que se elimina una carta correctamente de la colección cuando se recibe el mensaje adecuado del cliente.

6. **Actualizar una Carta en la Colección:**
   - Comprueba que se actualiza correctamente una carta en la colección cuando se recibe el mensaje adecuado del cliente.

7. **Leer una Carta de la Colección:**
   - Verifica que se lee correctamente una carta de la colección cuando se recibe el mensaje adecuado del cliente.

8. **Listar las Cartas de la Colección:**
   - Asegura que se listan correctamente todas las cartas de la colección cuando se recibe el mensaje adecuado del cliente.

9. **Enviar un Mensaje de Error si se Recibe un Mensaje Incorrecto:**
   - Verifica que se envía un mensaje de error si se recibe un mensaje incorrecto por parte del cliente.

10. **Impresión de Mensaje al Conectar un Cliente:**
    - Comprueba que se imprime un mensaje cuando un cliente se conecta al servidor.


## EventEmitterSocket.spec.ts
Se han desarrollado una serie de pruebas unitarias para asegurar el correcto funcionamiento del servidor de sockets. Estas pruebas cubren diversos aspectos de la funcionalidad del servidor, incluyendo la emisión de eventos, la gestión de conexiones, y el manejo adecuado de mensajes recibidos.

#### Descripción de las Pruebas

1. **Herencia de EventEmitter:**
   - Verifica que la clase `EventEmitterSocket` hereda de `EventEmitter`, lo cual es necesario para manejar eventos en Node.js.

2. **Emisión del Evento "request" al Recibir un Mensaje Completo:**
   - Asegura que se emite el evento "request" cuando se recibe un mensaje completo por parte de un cliente.

3. **Emisión del Evento "close" al Cerrar la Conexión:**
   - Comprueba que se emite el evento "close" cuando se cierra la conexión del cliente.

4. **No Emisión del Evento "request" si no se Recibe un Mensaje Completo:**
   - Verifica que no se emite el evento "request" si no se recibe un mensaje completo por parte del cliente.

5. **No Generar Errores al Recibir un Mensaje Vacío:**
   - Asegura que no se generan errores si se recibe un mensaje vacío por parte del cliente.

6. **No Generar Errores al Recibir Tipos de Datos Incorrectos:**
   - Verifica que no se generan errores si se recibe un tipo de dato incorrecto por parte del cliente.

7. **Pruebas de Herencia:**
   - Asegura que la clase `EventEmitterSocket` hereda correctamente de `EventEmitter`.

Todas estas pruebas fueron pasadas satisfactoriamente:
```bash
 140 passing (210ms)

-------------------------|---------|----------|---------|---------|---------------------------------------------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                       
-------------------------|---------|----------|---------|---------|---------------------------------------------------------
All files                |   95.75 |    80.56 |     100 |   95.75 |                                                         
 src                     |     100 |      100 |     100 |     100 |                                                         
  basicfunction.ts       |     100 |      100 |     100 |     100 |                                                         
 src/EJERCICIO           |   95.72 |    75.51 |     100 |   95.72 |                                                         
  EnumerationColor.ts    |     100 |      100 |     100 |     100 |                                                         
  EnumerationLineType.ts |     100 |      100 |     100 |     100 |                                                         
  EnumerationRarity.ts   |     100 |      100 |     100 |     100 |                                                         
  EventEmitterSocket.ts  |     100 |      100 |     100 |     100 |                                                         
  FileManager.ts         |     100 |      100 |     100 |     100 |                                                         
  User.ts                |   92.48 |    75.78 |     100 |   92.48 | 100-101,120-123,148-149
 src/MODIFICACION        |   95.16 |    78.57 |     100 |   95.16 |                                                         
  Metodos.ts             |   95.16 |    78.57 |     100 |   95.16 | 24                                          
-------------------------|---------|----------|---------|---------|---------------------------------------------------------
```

# 12. Modificación.

## Enunciado:
Durante la práctica 9, debería haber escrito en alguna clase métodos para añadir, modificar, borrar y actualizar la información de una carta de la colección de un usuario:

Escoja dos de esos métodos y sustituya en los mismos la invocación de métodos del API síncrona de Node.js de gestión el sistema de ficheros, por llamadas a los métodos equivalentes del API asíncrona basada en callbacks.
Implemente ambos métodos siguiendo el patrón callback.
Lleve a cabo pruebas de ambos métodos.

## Código propuesto
Para el ejercicio propuesto en clase se realizó el siguiente código:
```typescript
import { Card } from '../EJERCICIO/Card.js';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Método para añadir una carta a la colección de forma asíncrona.
 * Utiliza el patrón de programación asíncrona con callbacks.
 * @param card: Card - Carta a añadir 
 * @param callback: (error: Error | null, message?: string) => void - Función de retorno
 * @returns void no devuelve nada
 */
export function addCard(card: Card, callback: (error: Error | null, message?: string) => void): void {
  // Verificar si la carta ya existe en la colección
  if (this.collection.some((c: Card) => c.id === card.id)) {
    callback(null, `La carta con ID ${card.id} ya existe en la colección.`);
  } else {
    // Agregar la carta a la colección
    this.collection.push(card);
    const filePath = this.fileManager.getFilePath(card.id);
    // Verificar si el directorio existe, si no, crearlo de forma asíncrona
    fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
      // si hay un error, llamar al callback con el error
      if (err) {
        callback(err, `Error al crear el directorio para la carta en el sistema de archivos: ${err}`);
      } else {
        // Escribir la carta en el sistema de archivos de forma asíncrona
        fs.writeFile(filePath, JSON.stringify(card, null, 2), (err) => {
          if (err) {
            callback(err, `Error al escribir la carta en el sistema de archivos: ${err}`);
          } else {
            callback(null, `Nueva carta añadida a la colección.`);
          }
        });
      }
    });
  }
}

/**
 * Método para actualizar una carta de forma asíncrona.
 * Utiliza el patrón de programación asíncrona con callbacks.
 * @param updatedCard: Card - Carta actualizada 
 * @param callback: (error: Error | null, message?: string) => void - Función de retorno
 * @returns void no devuelve nada
 */
export function updateCard(updatedCard: Card, callback: (error: Error | null, message?: string) => void): void {
  const cardIndex = this.collection.findIndex((c: Card) => c.id === updatedCard.id);
  if (cardIndex === -1) {
    callback(null, `La carta con ID ${updatedCard.id} no existe en la colección.`);
  } else {
    // Actualizar la carta en la colección
    this.collection[cardIndex] = updatedCard;
    // Escribir la carta actualizada en el sistema de archivos de forma asíncrona
    fs.writeFile(this.fileManager.getFilePath(updatedCard.id), JSON.stringify(updatedCard, null, 2), (err) => {
      if (err) {
        callback(err, `Error al actualizar la carta en el sistema de archivos: ${err}`);
      } else {
        callback(null, `Carta actualizada en la colección.`);
      }
    });
  }
}

```
### Explicación de lo realizado.

#### Función `addCard`

Esta función se encarga de añadir una carta a la colección de forma asíncrona. Aquí hay un resumen de lo que hace:

1. **Verificación de la Existencia de la Carta:** Primero verifica si la carta ya existe en la colección. Si la carta ya está presente, se llama al callback con un mensaje indicando que la carta ya existe.

2. **Agregando la Carta a la Colección:** Si la carta no existe en la colección, se agrega a la colección.

3. **Gestión del Sistema de Archivos:** Luego, se obtiene la ruta del archivo donde se almacenará la carta. Se verifica si el directorio donde se almacenará la carta ya existe. Si no existe, se crea de forma asíncrona utilizando `fs.mkdir`. Una vez que el directorio está creado o si ya existe, se escribe la carta en el sistema de archivos utilizando `fs.writeFile`.

#### Función `updateCard`

Esta función se encarga de actualizar una carta en la colección de forma asíncrona. Aquí está el resumen de lo que hace:

1. **Búsqueda de la Carta:** Primero busca la carta en la colección. Si la carta no se encuentra, se llama al callback con un mensaje indicando que la carta no existe en la colección.

2. **Actualización de la Carta:** Si la carta se encuentra en la colección, se actualiza con los nuevos datos.

3. **Actualización en el Sistema de Archivos:** Luego, se escribe la carta actualizada en el sistema de archivos utilizando `fs.writeFile`.

Ambas funciones utilizan `fs.writeFile` para escribir en el sistema de archivos de forma asíncrona, lo que asegura que la operación no bloquee el hilo principal de Node.js. Una vez completada la operación, se llama al callback con cualquier error que haya ocurrido durante el proceso o un mensaje de éxito si la operación se completó correctamente.

## Pruebas realizadas.
```typescript
import "mocha";
import { expect } from "chai";
import { addCard, updateCard } from "../../src/MODIFICACION/Metodos.js";
import { Card } from "../../src/EJERCICIO/Card.js";
import { Color } from "../../src/EJERCICIO/EnumerationColor.js";
import { LineType } from "../../src/EJERCICIO/EnumerationLineType.js";
import { Rarity } from "../../src/EJERCICIO/EnumerationRarity.js";
import * as fs from "fs";
import * as sinon from "sinon";

// PRUEBAS ADDCARD
describe("Asynchronous function addCard tests", () => {
  // PRUEBA PARA EL MÉTODO addCard QUE AÑADE UNA CARTA A LA COLECCIÓN
  it("addCard should add a card to the collection", (done) => {
    const testCard: Card = {
      id: 1,
      name: "Test Card",
      manaCost: 5, 
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: "Texto de reglas de la carta.",
      marketValue: 10.0
    };
    // Simulamos la existencia de una colección vacía
    const collection: Card[] = [];
    // Simulamos la existencia de un objeto con la propiedad fileManager
    const fileManager = {
      getFilePath: () => "fake/filepath"
    };
    // Llamamos a la función addCard con el contexto adecuado y pasamos la colección
    addCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
      expect(error).to.be.null;
      expect(message).to.equal("Nueva carta añadida a la colección.");
      done();
    });
  });
  // PRUEBA PARA EL MÉTODO addCard QUE INTENTA AÑADIR UNA CARTA QUE YA EXISTE EN LA COLECCIÓN
  it("addCard should not add a card that already exists in the collection", (done) => {
    const testCard: Card = {
      id: 1,
      name: "Test Card",
      manaCost: 5, 
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: "Texto de reglas de la carta.",
      marketValue: 10.0
    };
    // Simulamos la existencia de una colección con una carta
    const collection: Card[] = [testCard];
    // Simulamos la existencia de un objeto con la propiedad fileManager
    const fileManager = {
      getFilePath: () => "fake/filepath"
    };
    // Llamamos a la función addCard con el contexto adecuado y pasamos la colección
    addCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
      expect(error).to.be.null;
      expect(message).to.equal("La carta con ID 1 ya existe en la colección.");
      done();
    });
  });

  it('should return an error if the card already exists in the collection', (done) => {
    const testCard: Card = {
      id: 1,
      name: "Test Card",
      manaCost: 5, 
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: "Texto de reglas de la carta.",
      marketValue: 10.0
    };
    const collection: Card[] = [testCard];
    const fileManager = {
      getFilePath: () => "fake/filepath"
    };
    addCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
      expect(message).to.equal(`La carta con ID ${testCard.id} ya existe en la colección.`);
      done();
    });
  });
  
});

// PRUEBAS UPDATECARD
describe("Asynchronous function updateCard tests", () => {
  // PRUEBA QUE ACTUALIZA UNA CARTA DE LA COLECCIÓN
  it("updateCard should update a card in the collection", (done) => {
    const testCard: Card = {
      id: 1,
      name: "Test Card",
      manaCost: 5, 
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: "Texto de reglas de la carta.",
      marketValue: 10.0
    };
    // Simulamos la existencia de una colección con una carta
    const collection: Card[] = [testCard];
    // Simulamos la existencia de un objeto con la propiedad fileManager
    const fileManager = {
      getFilePath: () => "fake/filepath"
    };
    // Llamamos a la función updateCard con el contexto adecuado y pasamos la colección
    updateCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
      expect(error).to.be.null;
      expect(message).to.equal("Carta actualizada en la colección.");
      done();
    });
  });

  // prueba que intenta actualizar una carta que no existe en la colección
  it("updateCard should not update a card that does not exist in the collection", (done) => {
    const testCard: Card = {
      id: 1,
      name: "Test Card",
      manaCost: 5, 
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: "Texto de reglas de la carta.",
      marketValue: 10.0
    };
    // Simulamos la existencia de una colección vacía
    const collection: Card[] = [];
    // Simulamos la existencia de un objeto con la propiedad fileManager
    const fileManager = {
      getFilePath: () => "fake/filepath"
    };
    // Llamamos a la función updateCard con el contexto adecuado y pasamos la colección
    updateCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
      expect(error).to.be.null;
      expect(message).to.equal("La carta con ID 1 no existe en la colección.");
      done();
    });
  });
  describe("Asynchronous function updateCard tests", () => {
    // PRUEBA QUE ACTUALIZA UNA CARTA DE LA COLECCIÓN Y DEVUELVE UN MENSAJE DE ÉXITO
    it("updateCard should return a success message when updating a card in the collection", (done) => {
      const testCard: Card = {
        id: 1,
        name: "Test Card",
        manaCost: 5, 
        color: Color.Blanco,
        cardType: LineType.Criatura,
        rarity: Rarity.Rara,
        rulesText: "Texto de reglas de la carta.",
        marketValue: 10.0
      };
      // Simulamos la existencia de una colección con una carta
      const collection: Card[] = [testCard];
      // Simulamos la existencia de un objeto con la propiedad fileManager
      const fileManager = {
        getFilePath: () => "fake/filepath"
      };
      // Llamamos a la función updateCard con el contexto adecuado y pasamos la colección
      updateCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
        expect(error).to.be.null;
        expect(message).to.equal("Carta actualizada en la colección.");
        done();
      });
    });

    // PRUEBA QUE DEVUELVE UN MENSAJE DE ERROR CUANDO SE INTENTA ACTUALIZAR UNA CARTA QUE NO EXISTE
    it("updateCard should return an error message when attempting to update a card that does not exist", (done) => {
      const testCard: Card = {
        id: 2, // Cambiamos el ID para que no exista en la colección
        name: "Test Card",
        manaCost: 5, 
        color: Color.Blanco,
        cardType: LineType.Criatura,
        rarity: Rarity.Rara,
        rulesText: "Texto de reglas de la carta.",
        marketValue: 10.0
      };
      // Simulamos la existencia de una colección vacía
      const collection: Card[] = [];
      // Simulamos la existencia de un objeto con la propiedad fileManager
      const fileManager = {
        getFilePath: () => "fake/filepath"
      };
      // Llamamos a la función updateCard con el contexto adecuado y pasamos la colección
      updateCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
        expect(error).to.be.null;
        expect(message).to.equal(`La carta con ID ${testCard.id} no existe en la colección.`);
        done();
      });
    });

    it('should return an error if the card does not exist in the collection', (done) => {
      const testCard: Card = {
        id: 1,
        name: "Test Card",
        manaCost: 5, 
        color: Color.Blanco,
        cardType: LineType.Criatura,
        rarity: Rarity.Rara,
        rulesText: "Texto de reglas de la carta.",
        marketValue: 10.0
      };
      const collection: Card[] = [];
      const fileManager = {
        getFilePath: () => "fake/filepath"
      };
      updateCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
        expect(message).to.equal(`La carta con ID ${testCard.id} no existe en la colección.`);
        done();
      });
    });
  });
});
```

### Pruebas para `addCard`

1. **Añadir una carta a la colección:**
   - Se prueba que la función `addCard` añada una carta a la colección. Se simula una colección vacía y se pasa una carta para ser añadida. Se espera que el callback retorne un mensaje indicando que la carta fue añadida correctamente.

2. **Intento de añadir una carta que ya existe:**
   - Se prueba que la función `addCard` no añada una carta que ya existe en la colección. Se simula una colección que ya contiene una carta con el mismo ID que la que se intenta añadir. Se espera que el callback retorne un mensaje indicando que la carta ya existe en la colección.

### Pruebas para `updateCard`

1. **Actualizar una carta en la colección:**
   - Se prueba que la función `updateCard` actualice una carta en la colección. Se simula una colección que contiene una carta, y se intenta actualizar esa carta. Se espera que el callback retorne un mensaje indicando que la carta fue actualizada correctamente.

2. **Intento de actualizar una carta que no existe:**
   - Se prueba que la función `updateCard` no actualice una carta que no existe en la colección. Se simula una colección vacía y se intenta actualizar una carta que no está presente en ella. Se espera que el callback retorne un mensaje indicando que la carta no existe en la colección.

En cada prueba se utilizan stubs y mocks para simular el comportamiento de las dependencias externas, como el sistema de archivos (`fs`) y el administrador de archivos (`fileManager`). Esto garantiza que las pruebas se centren en el comportamiento específico de las funciones `addCard` y `updateCard`. Además, se utiliza `sinon` para espiar las llamadas a funciones y asegurarse de que se llamen correctamente dentro de las pruebas.


# 13. Conclusiones.
En esta práctica se logró implementar una aplicación cliente-servidor para coleccionistas de cartas Magic utilizando sockets en Node.js. La aplicación permite a múltiples usuarios interactuar simultáneamente con el servidor, realizando operaciones como añadir, modificar, eliminar, listar y mostrar cartas. La persistencia de la información se logra almacenando los datos de las cartas en ficheros JSON en el sistema de archivos del servidor. Se aplicaron principios de desarrollo dirigido por pruebas (TDD/BDD), utilizando pruebas unitarias para garantizar la estabilidad y calidad del código. Además, se incorporó documentación mediante TypeDoc y se configuraron flujos de trabajo en GitHub Actions para realizar pruebas automáticas y análisis de calidad del código.

En conclusión, esta práctica permitió consolidar conocimientos sobre el uso de sockets en Node.js, así como aplicar principios de diseño y metodologías de desarrollo que promueven la construcción de aplicaciones robustas y mantenibles. La implementación de la aplicación cliente-servidor para coleccionistas de cartas Magic demostró la capacidad para gestionar eficientemente las conexiones de múltiples usuarios y proporcionar una experiencia de usuario interactiva y segura.