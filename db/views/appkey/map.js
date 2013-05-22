function(doc) {
    if(doc.appkey)
        emit(doc.appkey,doc.clientname);
}