//fonction
function initListe (){
    numberTab=[1,2,3,4,5,6,7,8,9],val=0,compteur=0,tabListe=[liste1=[],liste2=[],liste3=[]];
    for (let i = 0;i < 8; i++){
        tabListe[i%3][compteur] = Number(numberTab.splice(rndm(0,8-i), 1))
        if(i%3 == 2){
            compteur ++ ;
        }
    }
    tabListe [2][2] = numberTab[0]
    return tabListe
}

function revelation (index1,index2,listeVide,liste){
    listeVide [index1][index2] = liste [index1][index2];
    return listeVide
}

function affichage (liste){
    let compteur =0,message="   __1_____2____3\n";
    for (let i = 0;i <= 8; i++){
        if(i%3 == 2){
            message += `\t${liste[compteur][i%3]}\n`;
            compteur ++ ;
        }
        else if(i%3 == 0){
            message += `${compteur+1}|\t${liste[compteur][i%3]}\t`;
        }
        else{
            message += `\t${liste[compteur][i%3]}\t`;
        }
    }
    console.log(message);
    return message;
}

function demandeValeur (liste,message){
    let entry = 0;
    while (entry<1 || entry>3){
        entry = Number(prompt(`${affichage(liste)}\n ${message}`));
    }
    return entry;
}

function choisir (val,liste){
    let sens=true;
    switch(val){
        case "ligne1":
            return sommeLigne(0,liste);
        case "ligne2":
            return sommeLigne(1,liste);
        case "ligne3":
            return sommeLigne(2,liste);
        case "colone1":
            return sommeColone(0,liste);
        case "colone2":
            return sommeColone(1,liste);
        case "colone3":
            return sommeColone(2,liste);
        case "diagodg":
            return sommeDiago(sens,liste);
        case "diagogd":
            sens = false;
            return sommeDiago(sens,liste);
        default :
        console.log("incorrect")
        return 0;
    }
}
function attributionPoints(val){
    switch(val){
        case 6 :
            return 10000;
        case 7||19 :
            return 36;
        case 8 :
            return 720;
        case 9 :
            return 360;
        case 10 :
            return 80;
        case 11 :
            return 252;
        case 12 :
            return 108;
        case 13 || 16:
            return 72;
        case 14 :
            return 54;
        case 15:
            return 180;
        case 17 :
            return 180;
        case 18 :
            return 119;
        case 20 :
            return 306;
        case 21 :
            return 1080;
        case 22 :
            return 144;
        case 23 :
            return 1800;
        case 24 :
            return 3600;
    }
}

function sommeLigne(ligne,liste){
    let somme =0;
    for (let i = 0; i < 3 ; i++){
        somme += liste[ligne][i];
        listeChoix[i]=liste[ligne][i];
    }
    return somme;
}
function sommeColone(colone,liste){
    let somme =0;
    for (let i = 0; i < 3 ; i++){
        somme += liste[i][colone];
        listeChoix[i]=liste[i][colone];
    }
    return somme;
}
function sommeDiago (direction,liste){
    letsomme=0;
    if (direction){
        for (let i =0 ; i<3;i++){
            somme += liste[i][i];
            listeChoix[i]=liste[i][i];
        }
    }
    else{
        for (let i =2 ; i>=0 ; i--){
            somme += liste[i][i];
            listeChoix[i]=liste[i][i];
        }
    }
    return somme;
}

function affichagelisteChoix(liste){
    let message="[";
    for(let i in liste){
        message += " "+liste[i];
    }
    message += " ]";
    return message
}

function rndm (vMin,VMax){
return Math.floor(Math.random() * (VMax+1 - vMin) + vMin);
}

//initialisation
let colone1=[0,0,0],colone2=[0,0,0],colone3=[0,0,0];
let listeAffichage =[colone1,colone2,colone3],listeStockage=[],listeChoix=[];
let tours =0,messageGlobal="",teste=true,choix="",somme=0,point=0;

listeStockage = initListe();
console.table(listeStockage)
listeAffichage = revelation(rndm(0,2),rndm(0,2),listeAffichage,listeStockage);
console.table(listeAffichage);

while(tours<3){
    listeAffichage = revelation(demandeValeur(listeAffichage,"n° de ligne")-1,demandeValeur(listeAffichage,"n° de colone")-1,listeAffichage,listeStockage);
    tours++;
}

while(teste){
    messageGlobal = `${affichage(listeAffichage)}entrer selon votre choix :\nligne n°x(ex: ligne1)\ncolone n°x(ex: colone1)\ndiagoD(diagonale droite a gauche)\ndiagoGD(diagonale gauche a droite)`;
    choix = prompt(messageGlobal).toLowerCase();
    console.log(choix)
    somme = choisir(choix,listeStockage);
    if(somme != 0){
        teste = false;
    }
}

console.log(somme);
point = attributionPoints(somme);

messageGlobal = `${affichage(listeStockage)} \nvous avez choisi ${choix}: ${affichagelisteChoix(listeChoix)}\nPour un total de ${somme}\nVous avez ${point} points !!`;
alert(messageGlobal);
