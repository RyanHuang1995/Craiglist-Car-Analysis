text2 = soup.body.find('p', class_="attrgroup").text # The text of the first paragraph
text2list = text2.split()
text2list =[x.upper() for x in text2list] #Converts Items in list to uppercase for comparison sake
#Below is a list of all brands of cars 
BrandList = ["ACURA","ARASH","ALFA","ROMEO","ALFA-ROMEO","ALFA ROMEO","ARIEL","ASCARI","ASTON","MARTIN","ASTON MARTIN","AUDI","BENTLEY","BOWLER","BMW","BRIGGS","BRISTOL","BROOKE","BUGATTI","BUICK","CADILLAC","CAPARO","CATERHAM","CHERY","CHEVROLET","CHEVRON","CHRYSLER","CITROEN","CORVETTE","DAIHATSU","DATSUN","DODGE","DONKERVOORT","FERRARI","FIAT","FISKER","FORD","FPV","GINETTA","GMC","HENNESSEY","HOLDEN","HONDA","HYUNDAI","INFINITI","ISUZU","JAGUAR","JEEP","JOSS","KAMAZ","KIA","KOENIGSEGG","KTM (X-BOW)","LAMBORGHINI","LANCIA","LAND ROVER","LEXUS","LISTER","LINCOLN","LOTUS","MAHINDRA","MARUTISUZUKI","MASERATI","MASTRETTA","MAZDA","MCLAREN","MERCEDES","BENZ","MERCEDES-BENZ","MG MOTOR","MINI","MITSUBISHI","MORGAN","NISSAN","NOBLE","OPEL","PAGANI","PERODUA","PEUGEOT","PORSCHE","PROTON","RADICAL","RAM","RENAULT","ROEWE","ROLLS","ROYCE","ROLLS-ROYCE","RUF","SALEEN","SAAB","SCION","SEAT","SKODA","SMART","SRT","SSANGYONG","SUBARU","SUPERFORMANCE","SUZUKI","TATA","TESLA","TOYOTA","TVR","ULTIMA","VAUXHALL","VENTURI","VOLKSWAGEN","VW","VOLVO","WESTFIELD","WIESMANN","ZENVO","ALPINE","AMERICAN","ASIA","AUSTIN","HEALEY","AUSTIN-HEALEY","DAEWOO","DE TOMASO","DEVON","GUMPERT","HUMMER","INVICTA","MARCOS","MAYBACH","MORRIS","OLDSMOBILE","PLYMOUTH","PONTIAC","SATURN","SPYKER"]
# IF CONDITION CHECKS IF TEXT2LIST CONTAINS ANY CAR MAKES/BRANDS NAMES
if any(x in BrandList for x in text2list) :
    def concatenate_list_data(list): #Concatenates items in list to one string
        result= ''
        for element in list:
            result += str(element + ' ')
        return result

    yearlist = list(range(1900, 2020)) #All possible years
    stryearlist = [str(item) for item in yearlist] #convert  int years in yearlist to string

    mergedlist = BrandList + stryearlist #Merge list of brands and years. To be used to get model of cars

    Makelist = list(set(BrandList) & set(text2list)) # Sets a new list of car make
    Make = concatenate_list_data(Makelist)
    print(Make)

    modelist = [x for x in text2list if x not in mergedlist] # Sets a new list of car model
    Model = concatenate_list_data(modelist)
    print(Model)

    yearlist = list(set(stryearlist) & set(text2list)) # Sets a new list of car year
    Year = concatenate_list_data(yearlist)
    print(Year)