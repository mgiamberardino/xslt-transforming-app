<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:sv="http://www.jcp.org/jcr/sv/1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="node()|@*">
        <xsl:copy>
            <xsl:apply-templates select="node()|@*"/>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="//sv:property[starts-with(@sv:name, 'jcrName_nl')]">
    </xsl:template>

</xsl:stylesheet>