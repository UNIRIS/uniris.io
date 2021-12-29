$(document).ready(function() {
    $.getJSON("/assets/json/i18n.json").then(function (i18n) {
        window.i18n = i18n;
        window.initialI18N = fetchI18nInitialValues()

        const lang_code = getLanguagePage()
        if (lang_code == "") {
            return;
        }
        const lang_name = $(".language_menu_item[href='/" + lang_code +"']").text()

        update_menu(lang_name, lang_code, "English", "")
        applyI18n(i18n, lang_code)
    })
})

function getLanguagePage() {
    const url_split = location.pathname.split("/").filter(function (x) { return x})
    if (url_split.length == 0) {
        return ""
    }
    else {
        return url_split[0]
    }
}

$(".languages_menu").click(function (e) {
    if (e.target != e.currentTarget) {
        e.preventDefault()

        // Get the previous language name and code
        const previous_language = $(".current_language").text()
        const previous_lang_code = getLanguagePage()

        // Extract the language from the URL
        const url = e.target.getAttribute('href')
        const langName = e.target.text
        const langCode = url.split("/")[1]

        // Load the selected language
        history.pushState({page: langCode}, '', url);
        applyI18n(window.i18n, langCode)

        update_menu(langName, langCode, previous_language, previous_lang_code)

        window.lang = langCode
    }
    e.stopPropagation()
})

function update_menu(next_lang_name, next_lang_code, prev_lang_name, prev_lang_code) {
    //  Change the selected language menu
     $(".current_language").text(next_lang_name);

    //  Replace the selected language with the current one
     $(".language_menu_item[href='/" + next_lang_code +"']").text(prev_lang_name)
     $(".language_menu_item[href='/" + next_lang_code +"']").attr("href", "/" + prev_lang_code)
}

function fetchI18nInitialValues() {
    var initial_i18n = []
    $("[data-i18n]").each(function() {
        const key = $(this).attr("data-i18n")
        initial_i18n[key] = $(this).html()
    }) 

    $("[data-i18n-href]").each(function() {
        const key = $(this).attr("data-i18n-href")
        initial_i18n[key] = $(this).attr("href")
    })
    
    $("[data-i18n-placeholder]").each(function() {
        const key = $(this).attr("data-i18n-placeholder")
        initial_i18n[key] = $(this).attr("placeholder")
    })

    $("[data-i18n-form-action]").each(function() {
        const key = $(this).attr("data-i18n-form-action")
        initial_i18n[key] = $(this).attr("action")
    })


    return initial_i18n;
}

function applyI18n(i18n, lang) {
    $("[data-i18n]").each(function(){
        const key = $(this).attr("data-i18n")
        if (i18n[key] == undefined) {
            console.log("Translation for " + key + " doesn't exist")
            return
        }

        if (i18n[key] && i18n[key][lang]) {
            const value = i18n[key][lang]
            $(this).html(value)
        }
        else {
            $(this).html(window.initialI18N[key])
        }
    })
    

    $("[data-i18n-href]").each(function(){
        const key = $(this).attr("data-i18n-href")
        if (i18n[key] == undefined) {
            console.log("Translation for " + key + " doesn't exist")
            return
        }

        if (i18n[key] && i18n[key][lang]) {
            const value = i18n[key][lang]
            $(this).attr("href", value)
        }
        else {
            $(this).attr("href", window.initialI18N[key])
        }
    })

    $("[data-i18n-placeholder]").each(function(){
        const key = $(this).attr("data-i18n-placeholder")
        if (i18n[key] == undefined) {
            console.log("Translation for " + key + " doesn't exist")
            return
        }
        
        if (i18n[key] && i18n[key][lang]) {
            const value = i18n[key][lang]
            $(this).attr("placeholder", value)
        }
        else {
            $(this).attr("placeholder", window.initialI18N[key])
        }
    })

    $("[data-i18n-form-action]").each(function(){
        const key = $(this).attr("data-i18n-form-action")
        if (i18n[key] == undefined) {
            console.log("Translation for " + key + " doesn't exist")
            return
        }
        
        if (i18n[key] && i18n[key][lang]) {
            const value = i18n[key][lang]
            $(this).attr("action", value)
        }
        else {
            $(this).attr("action", window.initialI18N[key])
        }
    })
}